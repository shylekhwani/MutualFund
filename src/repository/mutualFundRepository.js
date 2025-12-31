import { MutualFund } from "../schemas/mutualFundSchema.js";

export const findAllfunds = async function () {
  try {
    // Finding all users in the database
    const funds = await MutualFund.find();
    // Returning the list of users found
    return funds;
  } catch (error) {
    console.log("error in fundRepo", error);
    throw error;
  }
};

export const createFund = async function (fund) {
  try {
    const newFund = await MutualFund.create(fund);
    return newFund;
  } catch (error) {
    console.log("error in fundRepo", error);
    throw error;
  }
};

export const getFundById = async function (id) {
  try {
    const Fund = await MutualFund.findById(id);
    return Fund;
  } catch (error) {
    console.log("error in fundRepo", error);
    throw error;
  }
};

export const updateNav = async function (fundid, nav) {
  try {
    const fundToUpdate = await MutualFund.findByIdAndUpdate(
      fundid,
      { nav },
      { new: true }
    );
    return fundToUpdate;
  } catch (error) {
    console.log("error in fundRepo", error);
    throw error;
  }
};
