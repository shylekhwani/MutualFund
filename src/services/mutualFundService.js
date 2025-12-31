import {
  createFund,
  findAllfunds,
  getFundById,
  updateNav,
} from "../repository/mutualFundRepository.js";

export const createFundService = async function (fund) {
  try {
    const newFund = await createFund(fund);

    return newFund;
  } catch (error) {
    console.log("Error in createFundService:", error); // Debug log
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw {
        status: 400,
        message: "fund with same details already exists",
      };
    } else {
      throw error; // Re-throw other errors
    }
  }
};

export const getAllFundService = async function () {
  try {
    const funds = await findAllfunds();
    return funds;
  } catch (error) {
    console.error("Error in getAllfunds:", error);
    throw error; // Pass the error to the controller
  }
};

export const getFundByIdService = async function (id) {
  try {
    const fund = await getFundById(id);
    return fund;
  } catch (error) {
    console.error("Error in getAllfunds:", error);
    throw error; // Pass the error to the controller
  }
};

export const updateNavService = async function (fundid, data) {
  try {
    const fund = await updateNav(fundid, data);
    return fund;
  } catch (error) {
    console.error("Error in updateNav:", error);
    throw error; // Pass the error to the controller
  }
};
