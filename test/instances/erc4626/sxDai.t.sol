// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.22;

import { stdStorage, StdStorage } from "forge-std/Test.sol";
import { ERC4626HyperdriveCoreDeployer } from "../../../contracts/src/deployers/erc4626/ERC4626HyperdriveCoreDeployer.sol";
import { ERC4626HyperdriveDeployerCoordinator } from "../../../contracts/src/deployers/erc4626/ERC4626HyperdriveDeployerCoordinator.sol";
import { ERC4626Target0Deployer } from "../../../contracts/src/deployers/erc4626/ERC4626Target0Deployer.sol";
import { ERC4626Target1Deployer } from "../../../contracts/src/deployers/erc4626/ERC4626Target1Deployer.sol";
import { ERC4626Target2Deployer } from "../../../contracts/src/deployers/erc4626/ERC4626Target2Deployer.sol";
import { ERC4626Target3Deployer } from "../../../contracts/src/deployers/erc4626/ERC4626Target3Deployer.sol";
import { ERC4626Target4Deployer } from "../../../contracts/src/deployers/erc4626/ERC4626Target4Deployer.sol";
import { HyperdriveFactory } from "../../../contracts/src/factory/HyperdriveFactory.sol";
import { ERC4626Conversions } from "../../../contracts/src/instances/erc4626/ERC4626Conversions.sol";
import { IERC20 } from "../../../contracts/src/interfaces/IERC20.sol";
import { IERC4626 } from "../../../contracts/src/interfaces/IERC4626.sol";
import { IHyperdrive } from "../../../contracts/src/interfaces/IHyperdrive.sol";
import { ERC20ForwarderFactory } from "../../../contracts/src/token/ERC20ForwarderFactory.sol";
import { AssetId } from "../../../contracts/src/libraries/AssetId.sol";
import { ETH } from "../../../contracts/src/libraries/Constants.sol";
import { FixedPointMath, ONE } from "../../../contracts/src/libraries/FixedPointMath.sol";
import { HyperdriveMath } from "../../../contracts/src/libraries/HyperdriveMath.sol";
import { ERC20ForwarderFactory } from "../../../contracts/src/token/ERC20ForwarderFactory.sol";
import { ERC20Mintable } from "../../../contracts/test/ERC20Mintable.sol";
import { InstanceTest } from "../../utils/InstanceTest.sol";
import { HyperdriveUtils } from "../../utils/HyperdriveUtils.sol";
import { Lib } from "../../utils/Lib.sol";

contract sxDaiHyperdriveTest is InstanceTest {
    using FixedPointMath for uint256;
    using HyperdriveUtils for uint256;
    using HyperdriveUtils for IHyperdrive;
    using Lib for *;
    using stdStorage for StdStorage;

    // The wxDai contract.
    IERC20 internal constant WXDAI =
        IERC20(0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d);

    // The sxDai contract.
    IERC4626 internal constant SXDAI =
        IERC4626(0xaf204776c7245bF4147c2612BF6e5972Ee483701);

    // Whale accounts.
    address internal WXDAI_TOKEN_WHALE =
        address(0xd0Dd6cEF72143E22cCED4867eb0d5F2328715533);
    address[] internal baseTokenWhaleAccounts = [WXDAI_TOKEN_WHALE];
    address internal SXDAI_TOKEN_WHALE =
        address(0x7a5c3860a77a8DC1b225BD46d0fb2ac1C6D191BC);
    address[] internal vaultSharesTokenWhaleAccounts = [SXDAI_TOKEN_WHALE];

    // The configuration for the instance testing suite.
    InstanceTestConfig internal __testConfig =
        InstanceTestConfig({
            name: "Hyperdrive",
            kind: "ERC4626Hyperdrive",
            decimals: 18,
            baseTokenWhaleAccounts: baseTokenWhaleAccounts,
            vaultSharesTokenWhaleAccounts: vaultSharesTokenWhaleAccounts,
            baseToken: WXDAI,
            vaultSharesToken: SXDAI,
            shareTolerance: 1e3,
            minimumShareReserves: 1e15,
            minimumTransactionAmount: 1e15,
            positionDuration: POSITION_DURATION,
            fees: IHyperdrive.Fees({
                curve: 0,
                flat: 0,
                governanceLP: 0,
                governanceZombie: 0
            }),
            enableBaseDeposits: true,
            enableShareDeposits: true,
            enableBaseWithdraws: true,
            enableShareWithdraws: true,
            baseWithdrawError: new bytes(0),
            isRebasing: false,
            // The base test tolerances.
            roundTripLpInstantaneousWithBaseTolerance: 1e5,
            roundTripLpWithdrawalSharesWithBaseTolerance: 1e5,
            roundTripLongInstantaneousWithBaseUpperBoundTolerance: 1e3,
            roundTripLongInstantaneousWithBaseTolerance: 1e5,
            roundTripLongMaturityWithBaseUpperBoundTolerance: 1e3,
            roundTripLongMaturityWithBaseTolerance: 1e5,
            roundTripShortInstantaneousWithBaseUpperBoundTolerance: 1e3,
            roundTripShortInstantaneousWithBaseTolerance: 1e5,
            roundTripShortMaturityWithBaseTolerance: 1e5,
            // The share test tolerances.
            closeLongWithSharesTolerance: 20,
            closeShortWithSharesTolerance: 100,
            roundTripLpInstantaneousWithSharesTolerance: 1e7,
            roundTripLpWithdrawalSharesWithSharesTolerance: 1e7,
            roundTripLongInstantaneousWithSharesUpperBoundTolerance: 1e3,
            roundTripLongInstantaneousWithSharesTolerance: 1e5,
            roundTripLongMaturityWithSharesUpperBoundTolerance: 1e3,
            roundTripLongMaturityWithSharesTolerance: 1e5,
            roundTripShortInstantaneousWithSharesUpperBoundTolerance: 1e3,
            roundTripShortInstantaneousWithSharesTolerance: 1e5,
            roundTripShortMaturityWithSharesTolerance: 1e5
        });

    /// @dev Instantiates the instance testing suite with the configuration.
    constructor() InstanceTest(__testConfig) {}

    /// @dev Forge function that is invoked to setup the testing environment.
    function setUp() public override __gnosis_chain_fork(35_681_086) {
        // Invoke the Instance testing suite setup.
        super.setUp();
    }

    /// Overrides ///

    /// @dev Gets the extra data used to deploy Hyperdrive instances.
    /// @return The extra data.
    function getExtraData() internal pure override returns (bytes memory) {
        return new bytes(0);
    }

    /// @dev Converts base amount to the equivalent about in shares.
    function convertToShares(
        uint256 baseAmount
    ) internal view override returns (uint256) {
        return ERC4626Conversions.convertToShares(SXDAI, baseAmount);
    }

    /// @dev Converts share amount to the equivalent amount in base.
    function convertToBase(
        uint256 shareAmount
    ) internal view override returns (uint256) {
        return ERC4626Conversions.convertToBase(SXDAI, shareAmount);
    }

    /// @dev Deploys the ERC4626 deployer coordinator contract.
    /// @param _factory The address of the Hyperdrive factory.
    function deployCoordinator(
        address _factory
    ) internal override returns (address) {
        vm.startPrank(alice);
        return
            address(
                new ERC4626HyperdriveDeployerCoordinator(
                    string.concat(__testConfig.name, "DeployerCoordinator"),
                    _factory,
                    address(new ERC4626HyperdriveCoreDeployer()),
                    address(new ERC4626Target0Deployer()),
                    address(new ERC4626Target1Deployer()),
                    address(new ERC4626Target2Deployer()),
                    address(new ERC4626Target3Deployer()),
                    address(new ERC4626Target4Deployer())
                )
            );
    }

    /// @dev Fetches the total supply of the base and share tokens.
    function getSupply() internal view override returns (uint256, uint256) {
        return (SXDAI.totalAssets(), SXDAI.totalSupply());
    }

    /// @dev Fetches the token balance information of an account.
    function getTokenBalances(
        address account
    ) internal view override returns (uint256, uint256) {
        return (WXDAI.balanceOf(account), SXDAI.balanceOf(account));
    }

    /// @dev Verifies that deposit accounting is correct when opening positions.
    function verifyDeposit(
        address trader,
        uint256 amountPaid,
        bool asBase,
        uint256 totalBaseBefore,
        uint256 totalSharesBefore,
        AccountBalances memory traderBalancesBefore,
        AccountBalances memory hyperdriveBalancesBefore
    ) internal view override {
        if (asBase) {
            // Ensure that the total supply increased by the base paid.
            (uint256 totalBase, uint256 totalShares) = getSupply();
            assertApproxEqAbs(totalBase, totalBaseBefore + amountPaid, 1);
            assertApproxEqAbs(
                totalShares,
                totalSharesBefore + hyperdrive.convertToShares(amountPaid),
                1
            );

            // Ensure that the ETH balances didn't change.
            assertEq(
                address(hyperdrive).balance,
                hyperdriveBalancesBefore.ETHBalance
            );
            assertEq(bob.balance, traderBalancesBefore.ETHBalance);

            // Ensure that the Hyperdrive instance's base balance doesn't change
            // and that the trader's base balance decreased by the amount paid.
            (
                uint256 hyperdriveBaseAfter,
                uint256 hyperdriveSharesAfter
            ) = getTokenBalances(address(hyperdrive));
            (
                uint256 traderBaseAfter,
                uint256 traderSharesAfter
            ) = getTokenBalances(address(trader));
            assertEq(hyperdriveBaseAfter, hyperdriveBalancesBefore.baseBalance);
            assertEq(
                traderBaseAfter,
                traderBalancesBefore.baseBalance - amountPaid
            );

            // Ensure that the shares balances were updated correctly.
            assertApproxEqAbs(
                hyperdriveSharesAfter,
                hyperdriveBalancesBefore.sharesBalance +
                    hyperdrive.convertToShares(amountPaid),
                2
            );
            assertEq(traderSharesAfter, traderBalancesBefore.sharesBalance);
        } else {
            // Ensure that the total supply and scaled total supply stay the same.
            (uint256 totalBase, uint256 totalShares) = getSupply();
            assertEq(totalBase, totalBaseBefore);
            assertApproxEqAbs(totalShares, totalSharesBefore, 1);

            // Ensure that the ETH balances didn't change.
            assertEq(
                address(hyperdrive).balance,
                hyperdriveBalancesBefore.ETHBalance
            );
            assertEq(bob.balance, traderBalancesBefore.ETHBalance);

            // Ensure that the base balances didn't change.
            (
                uint256 hyperdriveBaseAfter,
                uint256 hyperdriveSharesAfter
            ) = getTokenBalances(address(hyperdrive));
            (
                uint256 traderBaseAfter,
                uint256 traderSharesAfter
            ) = getTokenBalances(address(trader));
            assertEq(hyperdriveBaseAfter, hyperdriveBalancesBefore.baseBalance);
            assertEq(traderBaseAfter, traderBalancesBefore.baseBalance);

            // Ensure that the shares balances were updated correctly.
            assertApproxEqAbs(
                hyperdriveSharesAfter,
                hyperdriveBalancesBefore.sharesBalance +
                    convertToShares(amountPaid),
                2
            );
            assertApproxEqAbs(
                traderSharesAfter,
                traderBalancesBefore.sharesBalance -
                    convertToShares(amountPaid),
                2
            );
        }
    }

    /// @dev Verifies that withdrawal accounting is correct when closing positions.
    function verifyWithdrawal(
        address trader,
        uint256 baseProceeds,
        bool asBase,
        uint256 totalBaseBefore,
        uint256 totalSharesBefore,
        AccountBalances memory traderBalancesBefore,
        AccountBalances memory hyperdriveBalancesBefore
    ) internal view override {
        if (asBase) {
            // Ensure that the total supply decreased by the base proceeds.
            (uint256 totalBase, uint256 totalShares) = getSupply();
            assertApproxEqAbs(totalBase, totalBaseBefore - baseProceeds, 1);
            assertApproxEqAbs(
                totalShares,
                totalSharesBefore - convertToShares(baseProceeds),
                1
            );

            // Ensure that the ETH balances didn't change.
            assertEq(
                address(hyperdrive).balance,
                hyperdriveBalancesBefore.ETHBalance
            );
            assertEq(bob.balance, traderBalancesBefore.ETHBalance);

            // Ensure that the base balances were updated correctly.
            (
                uint256 hyperdriveBaseAfter,
                uint256 hyperdriveSharesAfter
            ) = getTokenBalances(address(hyperdrive));
            (
                uint256 traderBaseAfter,
                uint256 traderSharesAfter
            ) = getTokenBalances(address(trader));
            assertEq(hyperdriveBaseAfter, hyperdriveBalancesBefore.baseBalance);
            assertEq(
                traderBaseAfter,
                traderBalancesBefore.baseBalance + baseProceeds
            );

            // Ensure that the shares balances were updated correctly.
            assertApproxEqAbs(
                hyperdriveSharesAfter,
                hyperdriveBalancesBefore.sharesBalance -
                    convertToShares(baseProceeds),
                2
            );
            assertApproxEqAbs(
                traderSharesAfter,
                traderBalancesBefore.sharesBalance,
                1
            );
        } else {
            // Ensure that the total supply stayed the same.
            (uint256 totalBase, uint256 totalShares) = getSupply();
            assertApproxEqAbs(totalBase, totalBaseBefore, 1);
            assertApproxEqAbs(totalShares, totalSharesBefore, 1);

            // Ensure that the ETH balances didn't change.
            assertEq(
                address(hyperdrive).balance,
                hyperdriveBalancesBefore.ETHBalance
            );
            assertEq(bob.balance, traderBalancesBefore.ETHBalance);

            // Ensure that the base balances didn't change.
            (
                uint256 hyperdriveBaseAfter,
                uint256 hyperdriveSharesAfter
            ) = getTokenBalances(address(hyperdrive));
            (
                uint256 traderBaseAfter,
                uint256 traderSharesAfter
            ) = getTokenBalances(address(trader));
            assertApproxEqAbs(
                hyperdriveBaseAfter,
                hyperdriveBalancesBefore.baseBalance,
                1
            );
            assertApproxEqAbs(
                traderBaseAfter,
                traderBalancesBefore.baseBalance,
                1
            );

            // Ensure that the shares balances were updated correctly.
            assertApproxEqAbs(
                hyperdriveSharesAfter,
                hyperdriveBalancesBefore.sharesBalance -
                    convertToShares(baseProceeds),
                2
            );
            assertApproxEqAbs(
                traderSharesAfter,
                traderBalancesBefore.sharesBalance +
                    convertToShares(baseProceeds),
                2
            );
        }
    }

    /// Getters ///

    function test_getters() external view {
        (, uint256 totalShares) = getTokenBalances(address(hyperdrive));
        assertEq(hyperdrive.totalShares(), totalShares);
    }

    /// Price Per Share ///

    function test__pricePerVaultShare(uint256 basePaid) external {
        // Ensure that the share price is the expected value.
        (uint256 totalBase, uint256 totalSupply) = getSupply();
        uint256 vaultSharePrice = hyperdrive.getPoolInfo().vaultSharePrice;
        assertEq(vaultSharePrice, totalBase.divDown(totalSupply));

        // Ensure that the share price accurately predicts the amount of shares
        // that will be minted for depositing a given amount of shares. This will
        // be an approximation.
        basePaid = basePaid.normalizeToRange(
            2 * hyperdrive.getPoolConfig().minimumTransactionAmount,
            hyperdrive.calculateMaxLong()
        );
        (, uint256 hyperdriveSharesBefore) = getTokenBalances(
            address(hyperdrive)
        );
        openLong(bob, basePaid);
        (, uint256 hyperdriveSharesAfter) = getTokenBalances(
            address(hyperdrive)
        );
        assertApproxEqAbs(
            hyperdriveSharesAfter,
            hyperdriveSharesBefore + basePaid.divDown(vaultSharePrice),
            __testConfig.shareTolerance
        );
    }

    /// Helpers ///

    function advanceTime(
        uint256 timeDelta,
        int256 variableRate
    ) internal override {
        // Advance the time.
        vm.warp(block.timestamp + timeDelta);

        // Accrue interest in the sxDAI market. This amounts to manually
        // updating the total supply assets.
        uint256 totalAssets = SXDAI.totalAssets();
        (totalAssets, ) = totalAssets.calculateInterest(
            variableRate,
            timeDelta
        );
        bytes32 balanceLocation = keccak256(abi.encode(address(SXDAI), 3));
        vm.store(address(WXDAI), balanceLocation, bytes32(totalAssets));
    }
}
