// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import { IHyperdrive } from "../../interfaces/IHyperdrive.sol";
import { IHyperdriveAdminController } from "../../interfaces/IHyperdriveAdminController.sol";
import { IHyperdriveCoreDeployer } from "../../interfaces/IHyperdriveCoreDeployer.sol";
import { IStakingUSDS } from "../../interfaces/IStakingUSDS.sol";
import { StakingUSDSHyperdrive } from "../../instances/staking-usds/StakingUSDSHyperdrive.sol";

/// @author DELV
/// @title StakingUSDSHyperdriveCoreDeployer
/// @notice The core deployer for the StakingUSDSHyperdrive implementation.
/// @custom:disclaimer The language used in this code is for coding convenience
///                    only, and is not intended to, and does not, have any
///                    particular legal or regulatory significance.
contract StakingUSDSHyperdriveCoreDeployer is IHyperdriveCoreDeployer {
    /// @notice Deploys a Hyperdrive instance with the given parameters.
    /// @param __name The name of the Hyperdrive pool.
    /// @param _config The configuration of the Hyperdrive pool.
    /// @param _adminController The admin controller that will specify the
    ///        admin parameters for this instance.
    /// @param _extraData The extra data containing the staking USDS address.
    /// @param _target0 The target0 address.
    /// @param _target1 The target1 address.
    /// @param _target2 The target2 address.
    /// @param _target3 The target3 address.
    /// @param _target4 The target4 address.
    /// @param _salt The create2 salt used in the deployment.
    /// @return The address of the newly deployed StakingUSDSHyperdrive instance.
    function deployHyperdrive(
        string memory __name,
        IHyperdrive.PoolConfig memory _config,
        IHyperdriveAdminController _adminController,
        bytes memory _extraData,
        address _target0,
        address _target1,
        address _target2,
        address _target3,
        address _target4,
        bytes32 _salt
    ) external returns (address) {
        IStakingUSDS stakingUSDS = abi.decode(_extraData, (IStakingUSDS));
        return (
            address(
                // NOTE: We hash the sender with the salt to prevent the
                // front-running of deployments.
                new StakingUSDSHyperdrive{
                    salt: keccak256(abi.encode(msg.sender, _salt))
                }(
                    __name,
                    _config,
                    _adminController,
                    _target0,
                    _target1,
                    _target2,
                    _target3,
                    _target4,
                    stakingUSDS
                )
            )
        );
    }
}