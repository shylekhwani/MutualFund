import { getInvestmentById } from "../repository/investmentRepository.js";
import { getFundById } from "../repository/mutualFundRepository.js";
import { createRedemption } from "../repository/redemptionRepository.js";
import { createTransaction } from "../repository/transactionRepository.js";
import { getUserById } from "../repository/userRepository.js";

export const createRedemptionService = async function (redemData) {
  try {
    const { fundId, userId, investId, unitsToSell } = redemData;

    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    //  Fetch fund
    const fund = await getFundById(fundId);
    if (!fund || !fund.isActive) {
      throw new Error("Fund does not exist");
    }

    const investment = await getInvestmentById(investId);
    if (!investment) {
      throw new Error("Investment does not exist");
    }

    if (investment.userId.toString() !== userId.toString()) {
      throw new Error("Unauthorized Investment");
    }

    if (investment.fundId.toString() !== fundId) {
      throw new Error("Fund mismatch");
    }

    console.log("Investments", investment);

    if (unitsToSell > investment.units) {
      throw new Error("Not Enough Units");
    }

    const redeemAmt = unitsToSell * fund.nav;

    const avgBuyNav = investment.amount / investment.units; // Calculate average buy NAV

    //  Deduct units & persist
    investment.units -= unitsToSell;
    investment.amount -= unitsToSell * avgBuyNav;
    await investment.save();

    // update balance
    user.balance += redeemAmt;
    await user.save();

    // Create investment (explicit payload)
    const redemptionPayload = {
      userId,
      fundId,
      fundName: fund.name,
      investId,
      navAtSell: fund.nav,
      unitsToSell,
      amountCredited: redeemAmt.toFixed(2),
    };

    const redemption = await createRedemption(redemptionPayload);
    await createTransaction({
      userId,
      fundId,
      fundName: fund.name,
      amount: redeemAmt,
      nav: fund.nav,
      type: "SELL",
      units: unitsToSell,
    });
    return redemption;
  } catch (error) {
    console.log("Error in createRedemptionService:", error); // Debug log
    throw error; // Re-throw other errors
  }
};
