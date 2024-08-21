import { Address, keccak256, parseEther, toBytes, zeroAddress } from "viem";
import {
    EETH_ADDRESS_MAINNET,
    ETH_ADDRESS,
    HyperdriveInstanceConfig,
    SIX_MONTHS,
    getLinkerDetails,
    normalizeFee,
    parseDuration,
    toBytes32,
} from "../../lib";
import { MAINNET_EETH_COORDINATOR_NAME } from "./eeth-coordinator";
import { MAINNET_FACTORY_NAME } from "./factory";

// The name of the pool.
export const MAINNET_EETH_182DAY_NAME =
    "ElementDAO 182 Day ether.fi eETH Hyperdrive";

// The initial contribution of the pool.
const CONTRIBUTION = parseEther("0.01");

export const MAINNET_EETH_182DAY: HyperdriveInstanceConfig<"EETH"> = {
    name: MAINNET_EETH_182DAY_NAME,
    prefix: "EETH",
    coordinatorAddress: async (hre) =>
        hre.hyperdriveDeploy.deployments.byName(MAINNET_EETH_COORDINATOR_NAME)
            .address,
    deploymentId: keccak256(toBytes(MAINNET_EETH_182DAY_NAME)),
    salt: toBytes32("0xababe"),
    extraData: "0x",
    contribution: CONTRIBUTION,
    fixedAPR: parseEther("0.05"),
    timestretchAPR: parseEther("0.1"),
    options: async (hre) => ({
        asBase: false,
        extraData: "0x",
        destination: (await hre.getNamedAccounts())["deployer"] as Address,
    }),
    prepare: async (hre) => {
        // approve the coordinator
        let coordinatorDeployment = hre.hyperdriveDeploy.deployments.byName(
            MAINNET_EETH_COORDINATOR_NAME,
        );
        let coordinatorContract = await hre.viem.getContractAt(
            "EETHHyperdriveDeployerCoordinator",
            coordinatorDeployment.address,
        );
        let vaultSharesToken = await hre.viem.getContractAt(
            "openzeppelin/token/ERC20/IERC20.sol:IERC20",
            EETH_ADDRESS_MAINNET,
        );
        let pc = await hre.viem.getPublicClient();
        let tx = await vaultSharesToken.write.approve([
            coordinatorDeployment.address,
            await coordinatorContract.read.convertToBase([
                EETH_ADDRESS_MAINNET,
                CONTRIBUTION,
            ]),
        ]);
        await pc.waitForTransactionReceipt({ hash: tx });
    },
    poolDeployConfig: async (hre) => {
        return {
            baseToken: ETH_ADDRESS,
            vaultSharesToken: EETH_ADDRESS_MAINNET,
            circuitBreakerDelta: parseEther("0.075"),
            minimumShareReserves: parseEther("0.001"),
            minimumTransactionAmount: parseEther("0.001"),
            positionDuration: parseDuration(SIX_MONTHS),
            checkpointDuration: parseDuration("1 day"),
            timeStretch: 0n,
            governance: (await hre.getNamedAccounts())["deployer"] as Address,
            feeCollector: zeroAddress,
            sweepCollector: zeroAddress,
            checkpointRewarder: zeroAddress,
            ...(await getLinkerDetails(
                hre,
                hre.hyperdriveDeploy.deployments.byName(MAINNET_FACTORY_NAME)
                    .address,
            )),
            fees: {
                curve: parseEther("0.01"),
                flat: normalizeFee(parseEther("0.0005"), SIX_MONTHS),
                governanceLP: parseEther("0.15"),
                governanceZombie: parseEther("0.03"),
            },
        };
    },
};
