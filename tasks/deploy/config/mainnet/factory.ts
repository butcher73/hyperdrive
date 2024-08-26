import { Address, parseEther, zeroAddress } from "viem";
import { HyperdriveFactoryConfig, parseDuration } from "../../lib";

// The name of the factory.
export const MAINNET_FACTORY_NAME = "ElementDAO Hyperdrive Factory";

// The name of the forwarder factory.
export const MAINNET_FACTORY_FORWARDER_NAME =
    "ElementDAO ERC20 Factory Forwarder";

export const MAINNET_FACTORY: HyperdriveFactoryConfig = {
    name: MAINNET_FACTORY_NAME,
    prepare: async (hre, options) => {
        await hre.hyperdriveDeploy.ensureDeployed(
            MAINNET_FACTORY_FORWARDER_NAME,
            "ERC20ForwarderFactory",
            [MAINNET_FACTORY_FORWARDER_NAME],
            options,
        );
    },
    constructorArguments: async (hre) => [
        {
            governance: (await hre.getNamedAccounts())["deployer"] as Address,
            deployerCoordinatorManager: (await hre.getNamedAccounts())[
                "deployer"
            ] as Address,
            hyperdriveGovernance: (await hre.getNamedAccounts())[
                "deployer"
            ] as Address,
            defaultPausers: [
                (await hre.getNamedAccounts())["deployer"] as Address,
                (await hre.getNamedAccounts())["pauser"] as Address,
            ],
            feeCollector: zeroAddress,
            sweepCollector: zeroAddress,
            checkpointRewarder: zeroAddress,
            checkpointDurationResolution: parseDuration("1 hours"),
            minCheckpointDuration: parseDuration("24 hours"),
            maxCheckpointDuration: parseDuration("24 hours"),
            minPositionDuration: parseDuration("7 days"),
            maxPositionDuration: parseDuration("730 days"),
            minFixedAPR: parseEther("0.005"),
            maxFixedAPR: parseEther("0.1"),
            minTimeStretchAPR: parseEther("0.005"),
            maxTimeStretchAPR: parseEther("0.2"),
            minCircuitBreakerDelta: parseEther("0.01"),
            maxCircuitBreakerDelta: parseEther("0.2"),
            minFees: {
                curve: parseEther("0.001"),
                flat: parseEther("0.0001"),
                governanceLP: parseEther("0.15"),
                governanceZombie: parseEther("0.03"),
            },
            maxFees: {
                curve: parseEther("0.05"),
                flat: parseEther("0.005"),
                governanceLP: parseEther("0.15"),
                governanceZombie: parseEther("0.03"),
            },
            linkerFactory: hre.hyperdriveDeploy.deployments.byName(
                MAINNET_FACTORY_FORWARDER_NAME,
            ).address,
            linkerCodeHash: await (
                await hre.viem.getContractAt(
                    "ERC20ForwarderFactory",
                    hre.hyperdriveDeploy.deployments.byName(
                        MAINNET_FACTORY_FORWARDER_NAME,
                    ).address,
                )
            ).read.ERC20LINK_HASH(),
        },
        MAINNET_FACTORY_NAME,
    ],
};
