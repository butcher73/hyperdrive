// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.22;

import { HyperdriveTarget1 } from "../../external/HyperdriveTarget1.sol";
import { IHyperdrive } from "../../interfaces/IHyperdrive.sol";
import { IHyperdriveAdminController } from "../../interfaces/IHyperdriveAdminController.sol";
import { ILiquidityPool } from "../../interfaces/ILiquidityPool.sol";
import { EETHBase } from "./EETHBase.sol";

/// @author DELV
/// @title EETHTarget1
/// @notice EETHHyperdrive's target1 logic contract. This contract contains
///         several stateful functions that couldn't fit into the Hyperdrive
///         contract.
/// @custom:disclaimer The language used in this code is for coding convenience
///                    only, and is not intended to, and does not, have any
///                    particular legal or regulatory significance.
contract EETHTarget1 is HyperdriveTarget1, EETHBase {
    /// @notice Initializes the target1 contract.
    /// @param _config The configuration of the Hyperdrive pool.
    /// @param __adminController The admin controller that will specify the
    ///        admin parameters for this instance.
    /// @param _liquidityPool The Etherfi liquidity pool contract.
    constructor(
        IHyperdrive.PoolConfig memory _config,
        IHyperdriveAdminController __adminController,
        ILiquidityPool _liquidityPool
    ) HyperdriveTarget1(_config, __adminController) EETHBase(_liquidityPool) {}
}