// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.22;

import { MorphoBlueTarget2 } from "../../instances/morpho-blue/MorphoBlueTarget2.sol";
import { IHyperdrive } from "../../interfaces/IHyperdrive.sol";
import { IHyperdriveTargetDeployer } from "../../interfaces/IHyperdriveTargetDeployer.sol";
import { IMorphoBlueHyperdrive } from "../../interfaces/IMorphoBlueHyperdrive.sol";

/// @author DELV
/// @title MorphoBlueTarget2Deployer
/// @notice The target2 deployer for the MorphoBlueHyperdrive implementation.
/// @custom:disclaimer The language used in this code is for coding convenience
///                    only, and is not intended to, and does not, have any
///                    particular legal or regulatory significance.
contract MorphoBlueTarget2Deployer is IHyperdriveTargetDeployer {
    /// @notice Deploys a target2 instance with the given parameters.
    /// @param _config The configuration of the Hyperdrive pool.
    /// @param _extraData The extra data for the Morpho instance. This contains
    ///        the market parameters that weren't specified in the config.
    /// @param _salt The create2 salt used in the deployment.
    /// @return The address of the newly deployed MorphoBlueTarget2 instance.
    function deployTarget(
        IHyperdrive.PoolConfig memory _config,
        bytes memory _extraData,
        bytes32 _salt
    ) external returns (address) {
        IMorphoBlueHyperdrive.MorphoBlueParams memory params = abi.decode(
            _extraData,
            (IMorphoBlueHyperdrive.MorphoBlueParams)
        );
        return
            address(
                // NOTE: We hash the sender with the salt to prevent the
                // front-running of deployments.
                new MorphoBlueTarget2{
                    salt: keccak256(abi.encode(msg.sender, _salt))
                }(_config, params)
            );
    }
}
