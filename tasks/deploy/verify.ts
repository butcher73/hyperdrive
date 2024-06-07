import { task, types } from "hardhat/config";
import { evaluateValueOrHREFn } from "./lib";

export type VerifyParams = {};

/**
 * Used to avoid Etherscan rate limiting.
 */
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

task(
    "deploy:verify",
    "attempts to verify all deployed contracts for the specified network",
)
    .addOptionalParam(
        "name",
        "name of the contract to verify (leave blank to verify all deployed contracts)",
        undefined,
        types.string,
    )
    .setAction(async ({}: VerifyParams, hre) => {
        let { run, hyperdriveDeploy, config, network } = hre;
        let hyperdriveConfig = config.networks[network.name].hyperdriveDeploy;
        if (!hyperdriveConfig) {
            console.log("no config found for network");
            return;
        }
        if (!network.live) {
            console.log(
                `skipping verification for non-live network ${network.name}`,
            );
            return;
        }

        // Verify the registry.
        await run("verify:verify", {
            address: hyperdriveDeploy.deployments.byName(
                `${hre.network.name.toUpperCase()}_REGISTRY`,
            ).address,
            constructorArguments: [
                `${hre.network.name.toUpperCase()}_REGISTRY`,
            ],
        });

        // loop through all factories
        for (let f of hyperdriveConfig.factories ?? []) {
            // resolve the constructor args
            let constructorArguments = await evaluateValueOrHREFn(
                f.constructorArguments,
                hre,
            );

            // verify the linker factory
            console.log(`verifying ${f.name} linker factory...`);
            await run("verify:verify", {
                address: constructorArguments[0].linkerFactory,
                constructorArguments: [],
            });

            // verify the factory
            console.log(`verifying ${f.name}...`);
            await run("verify:verify", {
                address: hyperdriveDeploy.deployments.byName(f.name).address,
                constructorArguments,
            });
        }

        // loop through all coordinators
        for (let c of hyperdriveConfig.coordinators ?? []) {
            await sleep(1000);

            // verify the core deployer
            let coreDeployer = `${c.name}_${c.prefix}HyperdriveCoreDeployer`;
            let coreAddress =
                hyperdriveDeploy.deployments.byName(coreDeployer).address;
            console.log(
                `verifying ${c.name} ${c.prefix}HyperdriveCoreDeployer...`,
            );
            await run("verify:verify", {
                address: coreAddress,
                constructorArguments: c.extraConstructorArgs
                    ? await evaluateValueOrHREFn(
                          c.extraConstructorArgs,
                          hre,
                          {},
                      )
                    : [],
            });

            // verify the target deployers
            let targets = [];
            for (let i = 0; i < c.targetCount; i++) {
                await sleep(1000);
                let target = `${c.name}_${c.prefix}Target${i}Deployer`;
                let address =
                    hyperdriveDeploy.deployments.byName(target).address;
                targets.push(address);
                console.log(`verifying ${target}...`);
                await run("verify:verify", {
                    address,
                    constructorArguments: c.extraConstructorArgs
                        ? await evaluateValueOrHREFn(
                              c.extraConstructorArgs,
                              hre,
                              {},
                          )
                        : [],
                    libraries: {
                        LPMath: hyperdriveDeploy.deployments.byName("LPMath")
                            .address,
                    },
                });
            }

            // verify the coordinator
            console.log(`verifying ${c.name}...`);
            await run("verify:verify", {
                address: hyperdriveDeploy.deployments.byName(c.name).address,
                constructorArguments: [
                    await evaluateValueOrHREFn(c.factoryAddress, hre, {}),
                    coreAddress,
                    ...targets,
                    ...(c.token
                        ? [await evaluateValueOrHREFn(c.token, hre, {})]
                        : []),
                ],
            });
        }

        // loop through all instances
        for (let i of hyperdriveConfig.instances ?? []) {
            await sleep(1000);

            let instance = hre.hyperdriveDeploy.deployments.byName(i.name);
            let instanceContract = await hre.viem.getContractAt(
                "IHyperdriveRead",
                instance.address,
            );
            let poolConfig = await instanceContract.read.getPoolConfig();

            // obtain the instance's coordinator configuration to determine if additional
            // constructor arguments are necessary
            let coordinatorDeployment =
                hre.hyperdriveDeploy.deployments.byAddress(
                    await evaluateValueOrHREFn(i.coordinatorAddress, hre, {}),
                );
            let coordinatorConfig = hyperdriveConfig.coordinators.find(
                (c) => c.name == coordinatorDeployment.name,
            )!;
            let coordinatorContract = await hre.viem.getContractAt(
                "HyperdriveDeployerCoordinator",
                coordinatorDeployment.address,
            );

            // targets and hyperdrive instance are deployed with governance set to the factory
            // address
            let factoryAddress = await coordinatorContract.read.factory();
            poolConfig.governance = factoryAddress;

            // form target constructor args
            let targetArgs:
                | [typeof poolConfig]
                | [typeof poolConfig, `0x${string}`] = [poolConfig];

            // add extra args if present
            let extras = await evaluateValueOrHREFn(
                coordinatorConfig.extraConstructorArgs,
                hre,
                {},
            );
            if (extras) {
                targetArgs = [poolConfig, ...extras];
            }

            // verify the targets
            let targets = [];
            let targetCount =
                await coordinatorContract.read.getNumberOfTargets();
            for (let j = 0; j < targetCount; j++) {
                await sleep(1000);
                let targetName = `${i.name}_${i.prefix}Target${j}`;
                let targetAddress =
                    hre.hyperdriveDeploy.deployments.byName(targetName).address;
                console.log(targetAddress);
                targets.push(targetAddress);
                console.log(`verifying ${targetName}...`);
                await run("verify:verify", {
                    address: targetAddress,
                    constructorArguments: targetArgs,
                    libraries: {
                        LPMath: hyperdriveDeploy.deployments.byName("LPMath")
                            .address,
                    },
                });
            }

            // verify the instance
            console.log(`verifying ${i.name}...`);
            let ihyperdrive = await hre.viem.getContractAt(
                "IHyperdrive",
                instance.address,
            );
            let args = [
                poolConfig,
                await ihyperdrive.read.target0(),
                await ihyperdrive.read.target1(),
                await ihyperdrive.read.target2(),
                await ihyperdrive.read.target3(),
            ];
            console.log("args", ...args.slice(1));
            console.log("targets", ...targets);
            if (extras) {
                args.push(...extras);
            }
            let contract = `contracts/src/instances/${i.prefix.toLowerCase()}/${i.prefix}Hyperdrive.sol:${i.prefix}Hyperdrive`;
            await sleep(1000);
            await run("verify:verify", {
                address: hre.hyperdriveDeploy.deployments.byName(i.name)
                    .address,
                constructorArguments: args,
                contract,
            });
        }
    });
