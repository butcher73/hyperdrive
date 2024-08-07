// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.22;

import { HyperdriveTarget4 } from "../../external/HyperdriveTarget4.sol";
import { IHyperdrive } from "../../interfaces/IHyperdrive.sol";
import { ILiquidityPool } from "../../interfaces/ILiquidityPool.sol";
import { EETHBase } from "./EETHBase.sol";

/// @author DELV
/// @title EETHTarget4
/// @notice EETHHyperdrive's target4 logic contract. This contract contains
///         several stateful functions that couldn't fit into the Hyperdrive
///         contract.
/// @custom:disclaimer The language used in this code is for coding convenience
///                    only, and is not intended to, and does not, have any
///                    particular legal or regulatory significance.
contract EETHTarget4 is HyperdriveTarget4, EETHBase {
    /// @notice Initializes the target4 contract.
    /// @param _config The configuration of the Hyperdrive pool.
    /// @param _liquidityPool The Etherfi liquidity pool contract.
    constructor(
        IHyperdrive.PoolConfig memory _config,
        ILiquidityPool _liquidityPool
    ) HyperdriveTarget4(_config) EETHBase(_liquidityPool) {}
}
