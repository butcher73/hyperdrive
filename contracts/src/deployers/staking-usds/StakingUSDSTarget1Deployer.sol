// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.24;

import { StakingUSDSTarget1 } from "../../instances/staking-usds/StakingUSDSTarget1.sol";
import { IHyperdrive } from "../../interfaces/IHyperdrive.sol";
import { IHyperdriveAdminController } from "../../interfaces/IHyperdriveAdminController.sol";
import { IHyperdriveTargetDeployer } from "../../interfaces/IHyperdriveTargetDeployer.sol";
import { IStakingUSDS } from "../../interfaces/IStakingUSDS.sol";

/// @author DELV
/// @title StakingUSDSTarget1Deployer
/// @notice The target1 deployer for the StakingUSDSHyperdrive implementation.
/// @custom:disclaimer The language used in this code is for coding convenience
///                    only, and is not intended to, and does not, have any
///                    particular legal or regulatory significance.
contract StakingUSDSTarget1Deployer is IHyperdriveTargetDeployer {
    /// @notice Deploys a target1 instance with the given parameters.
    /// @param _config The configuration of the Hyperdrive pool.
    /// @param _adminController The admin controller that will specify the
    ///        admin parameters for this instance.
    /// @param _extraData The extra data containing the staking USDS address.
    /// @param _salt The create2 salt used in the deployment.
    /// @return The address of the newly deployed StakingUSDSTarget1 instance.
    function deployTarget(
        IHyperdrive.PoolConfig memory _config,
        IHyperdriveAdminController _adminController,
        bytes memory _extraData,
        bytes32 _salt
    ) external returns (address) {
        IStakingUSDS stakingUSDS = abi.decode(_extraData, (IStakingUSDS));
        return
            address(
                // NOTE: We hash the sender with the salt to prevent the
                // front-running of deployments.
                new StakingUSDSTarget1{
                    salt: keccak256(abi.encode(msg.sender, _salt))
                }(_config, _adminController, stakingUSDS)
            );
    }
}