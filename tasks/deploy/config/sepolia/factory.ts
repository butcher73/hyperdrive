import { Address, parseEther } from "viem";
import { HyperdriveFactoryConfig, parseDuration } from "../../lib";

export const SEPOLIA_FACTORY: HyperdriveFactoryConfig = {
    name: "FACTORY",
    prepare: async (hre, options) => {
        await hre.hyperdriveDeploy.ensureDeployed(
            "FACTORY_FORWARDER",
            "ERC20ForwarderFactory",
            [],
            options,
        );
    },
    constructorArguments: async (hre) => [
        {
            governance: "0xc187a246Ee5A4Fe4395a8f6C0f9F2AA3A5a06e9b",
            deployerCoordinatorManager: (await hre.getNamedAccounts())[
                "deployer"
            ] as Address,
            hyperdriveGovernance: "0xc187a246Ee5A4Fe4395a8f6C0f9F2AA3A5a06e9b",
            defaultPausers: [
                (await hre.getNamedAccounts())["deployer"] as Address,
            ],
            feeCollector: "0xc187a246Ee5A4Fe4395a8f6C0f9F2AA3A5a06e9b",
            sweepCollector: "0xc187a246Ee5A4Fe4395a8f6C0f9F2AA3A5a06e9b",
            checkpointRewarder: hre.hyperdriveDeploy.deployments.byName(
                "CHECKPOINT_REWARDER",
            ).address,
            checkpointDurationResolution: parseDuration("8 hours"),
            minCheckpointDuration: parseDuration("24 hours"),
            maxCheckpointDuration: parseDuration("24 hours"),
            minPositionDuration: parseDuration("7 days"),
            maxPositionDuration: parseDuration("365 days"),
            minFixedAPR: parseEther("0.01"),
            maxFixedAPR: parseEther("0.6"),
            minTimeStretchAPR: parseEther("0.01"),
            maxTimeStretchAPR: parseEther("0.6"),
            minCircuitBreakerDelta: parseEther("0.5"),
            maxCircuitBreakerDelta: parseEther("1"),
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
            linkerFactory:
                hre.hyperdriveDeploy.deployments.byName("FACTORY_FORWARDER")
                    .address,
            linkerCodeHash: await (
                await hre.viem.getContractAt(
                    "ERC20ForwarderFactory",
                    hre.hyperdriveDeploy.deployments.byName("FACTORY_FORWARDER")
                        .address,
                )
            ).read.ERC20LINK_HASH(),
        },
        "FACTORY",
    ],
};
