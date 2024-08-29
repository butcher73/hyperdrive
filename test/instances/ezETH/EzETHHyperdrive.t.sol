// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.22;

import { stdStorage, StdStorage } from "forge-std/Test.sol";
import { EzETHHyperdriveCoreDeployer } from "../../../contracts/src/deployers/ezeth/EzETHHyperdriveCoreDeployer.sol";
import { EzETHHyperdriveDeployerCoordinator } from "../../../contracts/src/deployers/ezeth/EzETHHyperdriveDeployerCoordinator.sol";
import { EzETHTarget0Deployer } from "../../../contracts/src/deployers/ezeth/EzETHTarget0Deployer.sol";
import { EzETHTarget1Deployer } from "../../../contracts/src/deployers/ezeth/EzETHTarget1Deployer.sol";
import { EzETHTarget2Deployer } from "../../../contracts/src/deployers/ezeth/EzETHTarget2Deployer.sol";
import { EzETHTarget3Deployer } from "../../../contracts/src/deployers/ezeth/EzETHTarget3Deployer.sol";
import { EzETHTarget4Deployer } from "../../../contracts/src/deployers/ezeth/EzETHTarget4Deployer.sol";
import { HyperdriveFactory } from "../../../contracts/src/factory/HyperdriveFactory.sol";
import { IERC20 } from "../../../contracts/src/interfaces/IERC20.sol";
import { IHyperdrive } from "../../../contracts/src/interfaces/IHyperdrive.sol";
import { IEzETHHyperdriveRead } from "../../../contracts/src/interfaces/IEzETHHyperdriveRead.sol";
import { IRestakeManager } from "../../../contracts/src/interfaces/IRenzo.sol";
import { IRenzoOracle, IDepositQueue } from "../../../contracts/src/interfaces/IRenzo.sol";
import { AssetId } from "../../../contracts/src/libraries/AssetId.sol";
import { ETH } from "../../../contracts/src/libraries/Constants.sol";
import { FixedPointMath, ONE } from "../../../contracts/src/libraries/FixedPointMath.sol";
import { HyperdriveMath } from "../../../contracts/src/libraries/HyperdriveMath.sol";
import { ERC20ForwarderFactory } from "../../../contracts/src/token/ERC20ForwarderFactory.sol";
import { ERC20Mintable } from "../../../contracts/test/ERC20Mintable.sol";
import { InstanceTest } from "../../utils/InstanceTest.sol";
import { HyperdriveUtils } from "../../utils/HyperdriveUtils.sol";
import { Lib } from "../../utils/Lib.sol";

contract EzETHHyperdriveTest is InstanceTest {
    using FixedPointMath for uint256;
    using Lib for *;
    using stdStorage for StdStorage;

    // The Renzo main entrypoint contract to stake ETH and receive ezETH.
    IRestakeManager internal constant RESTAKE_MANAGER =
        IRestakeManager(0x74a09653A083691711cF8215a6ab074BB4e99ef5);

    // The Renzo Oracle contract.
    IRenzoOracle internal constant RENZO_ORACLE =
        IRenzoOracle(0x5a12796f7e7EBbbc8a402667d266d2e65A814042);

    // The ezETH token contract.
    IERC20 internal constant EZETH =
        IERC20(0xbf5495Efe5DB9ce00f80364C8B423567e58d2110);

    // Renzo's DepositQueue contract called from RestakeManager.  Used to
    // simulate interest.
    IDepositQueue DEPOSIT_QUEUE =
        IDepositQueue(0xf2F305D14DCD8aaef887E0428B3c9534795D0d60);

    // Renzo's restaking protocol was launch Dec, 2023 and their use of
    // oracles makes it difficult to test on a mainnet fork without heavy
    // mocking.  To test with their deployed code we use a shorter position
    // duration.
    uint256 internal constant POSITION_DURATION_15_DAYS = 15 days;
    uint256 internal constant STARTING_BLOCK = 19119544;

    // Whale accounts.
    address internal EZETH_WHALE = 0x40C0d1fbcB0A43A62ca7A241E7A42ca58EeF96eb;
    address[] internal whaleAccounts = [EZETH_WHALE];

    // The configuration for the instance testing suite.
    InstanceTestConfig internal __testConfig =
        InstanceTestConfig({
            name: "Hyperdrive",
            kind: "EzETHHyperdrive",
            decimals: 18,
            baseTokenWhaleAccounts: new address[](0),
            vaultSharesTokenWhaleAccounts: whaleAccounts,
            baseToken: IERC20(ETH),
            vaultSharesToken: IERC20(EZETH),
            shareTolerance: 1e6,
            minimumShareReserves: 1e15,
            minimumTransactionAmount: 1e15,
            positionDuration: POSITION_DURATION_15_DAYS,
            fees: IHyperdrive.Fees({
                curve: 0,
                flat: 0,
                governanceLP: 0,
                governanceZombie: 0
            }),
            enableBaseDeposits: false,
            enableShareDeposits: true,
            enableBaseWithdraws: false,
            enableShareWithdraws: true,
            baseWithdrawError: abi.encodeWithSelector(
                IHyperdrive.UnsupportedToken.selector
            ),
            isRebasing: false,
            // NOTE: Base  withdrawals are disabled, so the tolerances are zero.
            //
            // The base test tolerances.
            roundTripLpInstantaneousWithBaseTolerance: 0,
            roundTripLpWithdrawalSharesWithBaseTolerance: 0,
            roundTripLongInstantaneousWithBaseUpperBoundTolerance: 0,
            roundTripLongInstantaneousWithBaseTolerance: 0,
            roundTripLongMaturityWithBaseUpperBoundTolerance: 0,
            roundTripLongMaturityWithBaseTolerance: 0,
            roundTripShortInstantaneousWithBaseUpperBoundTolerance: 0,
            roundTripShortInstantaneousWithBaseTolerance: 0,
            roundTripShortMaturityWithBaseTolerance: 0,
            // The share test tolerances.
            closeLongWithSharesTolerance: 1e6,
            closeShortWithSharesTolerance: 1e6,
            roundTripLpInstantaneousWithSharesTolerance: 1e7,
            roundTripLpWithdrawalSharesWithSharesTolerance: 1e7,
            roundTripLongInstantaneousWithSharesUpperBoundTolerance: 1e3,
            roundTripLongInstantaneousWithSharesTolerance: 1e7,
            roundTripLongMaturityWithSharesUpperBoundTolerance: 1e3,
            roundTripLongMaturityWithSharesTolerance: 1e7,
            roundTripShortInstantaneousWithSharesUpperBoundTolerance: 1e3,
            roundTripShortInstantaneousWithSharesTolerance: 1e7,
            roundTripShortMaturityWithSharesTolerance: 1e8
        });

    /// @dev Instantiates the instance testing suite with the configuration.
    constructor() InstanceTest(__testConfig) {}

    /// @dev Forge function that is invoked to setup the testing environment.
    function setUp() public override __mainnet_fork(STARTING_BLOCK) {
        // Giving the EzETH whale account more EzETH before the instance setup.
        vm.startPrank(EZETH_WHALE);
        vm.deal(EZETH_WHALE, 50_000e18);
        RESTAKE_MANAGER.depositETH{ value: 50_000e18 }();
        vm.stopPrank();

        // Invoke the instance testing suite setup.
        super.setUp();
    }

    /// Overrides ///

    /// @dev Gets the extra data used to deploy Hyperdrive instances.
    /// @return The extra data.
    function getExtraData() internal pure override returns (bytes memory) {
        return new bytes(0);
    }

    /// @dev Converts base amount to the equivalent about in EzETH.
    function convertToShares(
        uint256 baseAmount
    ) internal view override returns (uint256) {
        // Get protocol state information used for calculating shares.
        (uint256 sharePrice, , ) = getSharePrice();
        return baseAmount.divDown(sharePrice);
    }

    /// @dev Converts share amount to the equivalent amount in ETH.
    function convertToBase(
        uint256 baseAmount
    ) internal view override returns (uint256) {
        // Get the total TVL priced in ETH from RestakeManager.
        (, , uint256 totalTVL) = RESTAKE_MANAGER.calculateTVLs();

        // Get the total supply of the ezETH token.
        uint256 totalSupply = EZETH.totalSupply();

        return
            RENZO_ORACLE.calculateRedeemAmount(
                baseAmount,
                totalSupply,
                totalTVL
            );
    }

    /// @dev Deploys the EzETH deployer coordinator contract.
    /// @param _factory The address of the Hyperdrive factory contract.
    function deployCoordinator(
        address _factory
    ) internal override returns (address) {
        vm.startPrank(alice);
        return
            address(
                new EzETHHyperdriveDeployerCoordinator(
                    string.concat(__testConfig.name, "DeployerCoordinator"),
                    _factory,
                    address(new EzETHHyperdriveCoreDeployer(RESTAKE_MANAGER)),
                    address(new EzETHTarget0Deployer(RESTAKE_MANAGER)),
                    address(new EzETHTarget1Deployer(RESTAKE_MANAGER)),
                    address(new EzETHTarget2Deployer(RESTAKE_MANAGER)),
                    address(new EzETHTarget3Deployer(RESTAKE_MANAGER)),
                    address(new EzETHTarget4Deployer(RESTAKE_MANAGER)),
                    RESTAKE_MANAGER
                )
            );
    }

    /// @dev Fetches the token balance information of an account.
    function getTokenBalances(
        address account
    ) internal view override returns (uint256, uint256) {
        // EzETH does not have a convenient function for fetching base balance.
        return (0, EZETH.balanceOf(account));
    }

    /// @dev Fetches the total supply of the base and share tokens.
    function getSupply() internal view override returns (uint256, uint256) {
        (, uint256 totalPooledEther, ) = getSharePrice();
        return (totalPooledEther, EZETH.totalSupply());
    }

    /// @dev Verifies that deposit accounting is correct when opening positions.
    function verifyDeposit(
        address trader,
        uint256 basePaid,
        bool asBase,
        uint256 totalBaseSupplyBefore,
        uint256 totalSharesBefore,
        AccountBalances memory traderBalancesBefore,
        AccountBalances memory hyperdriveBalancesBefore
    ) internal view override {
        // Base deposits are not supported for this instance.
        if (asBase) {
            revert IHyperdrive.UnsupportedToken();
        }

        // Ensure that the amount of pooled ether stays the same.
        (, uint256 totalPooledEther, ) = getSharePrice();
        assertEq(totalPooledEther, totalBaseSupplyBefore);

        // Ensure that the ETH balances were updated correctly.
        assertEq(
            address(hyperdrive).balance,
            hyperdriveBalancesBefore.ETHBalance
        );
        assertEq(trader.balance, traderBalancesBefore.ETHBalance);

        // Ensure that the ezETH shares were updated correctly.
        uint256 expectedShares = convertToShares(basePaid);
        assertEq(EZETH.totalSupply(), totalSharesBefore);
        assertApproxEqAbs(
            EZETH.balanceOf(address(hyperdrive)),
            hyperdriveBalancesBefore.sharesBalance + expectedShares,
            2 // Higher tolerance due to rounding when converting back into shares.
        );
        assertApproxEqAbs(
            EZETH.balanceOf(trader),
            traderBalancesBefore.sharesBalance - expectedShares,
            2 // Higher tolerance due to rounding when converting back into shares.
        );
    }

    /// @dev Verifies that withdrawal accounting is correct when closing positions.
    function verifyWithdrawal(
        address trader,
        uint256 baseProceeds,
        bool asBase,
        uint256 totalPooledEtherBefore,
        uint256 totalSharesBefore,
        AccountBalances memory traderBalancesBefore,
        AccountBalances memory hyperdriveBalancesBefore
    ) internal view override {
        // Base withdraws are not supported for this instance.
        if (asBase) {
            revert IHyperdrive.UnsupportedToken();
        }

        // Ensure that the total pooled ether and shares stays the same.
        (, uint256 totalPooledEther, ) = getSharePrice();
        assertEq(totalPooledEther, totalPooledEtherBefore);
        assertApproxEqAbs(EZETH.totalSupply(), totalSharesBefore, 1);

        // Ensure that the ETH balances were updated correctly.
        assertEq(
            address(hyperdrive).balance,
            hyperdriveBalancesBefore.ETHBalance
        );
        assertEq(trader.balance, traderBalancesBefore.ETHBalance);

        // Ensure that the ezETH shares were updated correctly.
        uint256 expectedShares = baseProceeds.mulDivDown(
            totalSharesBefore,
            totalPooledEtherBefore
        );
        assertApproxEqAbs(
            EZETH.balanceOf(address(hyperdrive)),
            hyperdriveBalancesBefore.sharesBalance - expectedShares,
            1
        );
        assertApproxEqAbs(
            EZETH.balanceOf(trader),
            traderBalancesBefore.sharesBalance + expectedShares,
            1
        );
    }

    function test__ezeth_interest_and_advance_time() external {
        // hand calculated value sanity check
        uint256 positionAdjustedInterestRate = uint256(0.05e18).mulDivDown(
            POSITION_DURATION_15_DAYS,
            365 days
        );

        // Ensure that advancing time accrues interest like we expect.
        (uint256 sharePriceBefore, , ) = getSharePrice();
        advanceTime(POSITION_DURATION_15_DAYS, 0.05e18);
        (uint256 sharePriceAfter, , ) = getSharePrice();
        assertEq(positionAdjustedInterestRate, 0.002054794520547945e18);
        assertEq(
            sharePriceBefore.mulDown(1e18 + positionAdjustedInterestRate),
            sharePriceAfter
        );
    }

    /// Getters ///

    function test_getters() external view {
        assertEq(
            address(IEzETHHyperdriveRead(address(hyperdrive)).renzo()),
            address(RESTAKE_MANAGER)
        );
        assertEq(
            address(IEzETHHyperdriveRead(address(hyperdrive)).renzoOracle()),
            address(RENZO_ORACLE)
        );
        (, uint256 totalShares) = getTokenBalances(address(hyperdrive));
        assertEq(hyperdrive.totalShares(), totalShares);
    }

    /// Price Per Share ///

    function test__pricePerVaultShare(uint256 basePaid) external {
        // Ensure that the share price is the expected value.

        // Price in ETH / ezETH, does not include eigenlayer points.
        (uint256 sharePrice, , ) = getSharePrice();
        uint256 vaultSharePrice = hyperdrive.getPoolInfo().vaultSharePrice;
        assertEq(vaultSharePrice, sharePrice);

        // Calculate the maximum amount of basePaid we can test.
        uint256 maxLong = HyperdriveUtils.calculateMaxLong(hyperdrive);
        uint256 maxEzEth = EZETH.balanceOf(address(bob));
        uint256 maxRange = maxLong > maxEzEth ? maxEzEth : maxLong;
        basePaid = basePaid.normalizeToRange(
            2 * hyperdrive.getPoolConfig().minimumTransactionAmount,
            maxRange
        );

        // Convert to shares and approve hyperdrive.
        vm.startPrank(bob);
        uint256 sharesPaid = getAndApproveShares(basePaid);

        // Collect balance information.
        uint256 hyperdriveSharesBefore = EZETH.balanceOf(address(hyperdrive));

        // Open the position.
        openLong(bob, sharesPaid, false);

        // Ensure that the share price accurately predicts the amount of shares
        // that will be minted for depositing a given amount of ETH.
        assertEq(
            EZETH.balanceOf(address(hyperdrive)),
            hyperdriveSharesBefore + sharesPaid
        );
    }

    /// Helpers ///

    function advanceTime(
        uint256 timeDelta, // assume a position duration jump
        int256 variableRate // annual variable rate
    ) internal override {
        // Advance the time by a position duration and accrue interest.  We
        // adjust the variable rate to the position duration and multiply the
        // TVL to get interest:
        //
        //  sharePriceBefore * adjustedVariableRate = sharePriceAfter
        //
        //  becomes:
        //
        //  (tvlBefore / ezETHSupply) * adjustedVariableRate = tvlAfter / ezETHSuuply
        //
        //  tvlBefore * adjustedVariableRate = tvlAfter
        //
        //  Since the ezETHSupply is held constant when we advanceTime.
        (, uint256 totalTVLBefore, ) = getSharePrice();
        uint256 checkpointDuration = hyperdrive
            .getPoolConfig()
            .checkpointDuration;
        for (
            ;
            timeDelta >= checkpointDuration;
            timeDelta -= checkpointDuration
        ) {
            vm.warp(block.timestamp + checkpointDuration);
        }
        vm.warp(block.timestamp + timeDelta);

        // Accrue interest in Renzo. Since the share price is given by
        // `RESTAKE_MANAGER.calculateTVLs() / EZETH.totalSupply()`, we can simulate the
        // accrual of interest by adding to the balance of the DepositQueue contract.
        // RestakeManager adds the balance of the DepositQueue to totalTVL in calculateTVLs()
        uint256 adjustedVariableRate = uint256(variableRate).mulDivDown(
            POSITION_DURATION_15_DAYS,
            365 days
        );
        uint256 ethToAdd = totalTVLBefore.mulDown(adjustedVariableRate);
        if (variableRate >= 0) {
            vm.startPrank(address(RESTAKE_MANAGER));
            vm.deal(address(RESTAKE_MANAGER), ethToAdd);
            // use this method because no fees are taken
            DEPOSIT_QUEUE.depositETHFromProtocol{ value: ethToAdd }();
        } else {
            // NOTE: can't support subtracting eth when depositQueue has a zero balance.
            vm.deal(
                address(DEPOSIT_QUEUE),
                address(DEPOSIT_QUEUE).balance - ethToAdd
            );
        }
    }

    // returns share price information.
    function getSharePrice()
        internal
        view
        returns (
            uint256 sharePrice,
            uint256 totalPooledEther,
            uint256 totalShares
        )
    {
        // Get the total TVL priced in ETH from restakeManager.
        (, , uint256 totalTVL) = RESTAKE_MANAGER.calculateTVLs();

        // Get the total supply of the ezETH token.
        uint256 totalSupply = EZETH.totalSupply();

        // Calculate the share price.
        sharePrice = RENZO_ORACLE.calculateRedeemAmount(
            ONE,
            totalSupply,
            totalTVL
        );

        return (sharePrice, totalTVL, totalSupply);
    }

    function getAndApproveShares(
        uint256 basePaid
    ) internal returns (uint256 sharesPaid) {
        // Get the share amount.
        (, uint256 totalPooledEther, uint256 totalShares) = getSharePrice();
        sharesPaid = basePaid.mulDivDown(totalShares, totalPooledEther);

        // Approve hyperdrive to use the shares.
        EZETH.approve(address(hyperdrive), sharesPaid);
    }
}
