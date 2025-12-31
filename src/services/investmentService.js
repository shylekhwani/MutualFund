import {
  createInvestment,
  getAllInvestmentsOfUser,
} from "../repository/investmentRepository.js";
import { getFundById } from "../repository/mutualFundRepository.js";
import { getUserById } from "../repository/userRepository.js";

export const createInvestmentService = async function (fund) {
  try {
    const { fundId, userId } = fund;
    // console.log(fund);

    const isUserExist = await getUserById(userId);

    if (!isUserExist) {
      throw new Error("User Not exist");
      return;
    }

    const isFundExist = await getFundById(fundId);

    if (!isFundExist) {
      throw new Error("Fund Not exist");
      return;
    }
    const newInvestment = await createInvestment(fund);
    return newInvestment;
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
