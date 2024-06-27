import { HyperdriveCoordinatorConfig, MAINNET_STETH_ADDRESS } from "../../lib";
import { MAINNET_FACTORY_NAME } from "./factory";

export const MAINNET_STETH_COORDINATOR_NAME =
    "ElementDAO stETH Hyperdrive Deployer Coordinator";
export const MAINNET_STETH_COORDINATOR: HyperdriveCoordinatorConfig<"StETH"> = {
    name: MAINNET_STETH_COORDINATOR_NAME,
    prefix: "StETH",
    factoryAddress: async (hre) =>
        hre.hyperdriveDeploy.deployments.byName(MAINNET_FACTORY_NAME).address,
    targetCount: 4,
    token: MAINNET_STETH_ADDRESS,
};
