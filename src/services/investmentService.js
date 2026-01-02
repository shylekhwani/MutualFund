import {
  createInvestment,
  getAllInvestmentsOfUser,
} from "../repository/investmentRepository.js";
import { getFundById } from "../repository/mutualFundRepository.js";
import { getUserById } from "../repository/userRepository.js";

export const createInvestmentService = async function (fundData) {
  try {
    const { fundId, userId, amount } = fundData;
    // console.log(fundData);

    const user = await getUserById(userId);
    // console.log(userData);
    if (!user) {
      throw new Error("User does not exist");
    }

    // Balance check
    if (amount > user.balance) {
      throw new Error("Insufficient balance");
    }

    //  Fetch fund
    const fund = await getFundById(fundId);
    if (!fund || !fund.isActive) {
      throw new Error("Fund does not exist");
    }

    if (amount < fund.minInvestment) {
      throw new Error("Amount below minimum investment");
    }

    // Calculations
    const navAtBuy = fund.nav;
    const units = Number((amount / navAtBuy).toFixed(2));

    //  Deduct balance & persist
    user.balance -= amount;
    await user.save();

    // Create investment (explicit payload)
    const investmentPayload = {
      userId,
      fundId,
      fundName: fund.name,
      amount,
      navAtBuy,
      units,
    };

    const investment = await createInvestment(investmentPayload);
    return investment;
  } catch (error) {
    console.log("Error in CreateInvestmentService:", error); // Debug log
    throw error; // Re-throw other errors
  }
};

export const fetchInvestmentsUserService = async function (id) {
  try {
    const investments = await getAllInvestmentsOfUser(id);
    return investments;
  } catch (error) {
    console.log("Error in fetchInvestmentsUserService:", error); // Debug log
    throw error; // Re-throw other errors
  }
};
