import { REDEMPTION } from "../schemas/redemptionSchema.js";

export const createRedemption = async function (data) {
  try {
    const redeem = await REDEMPTION.create(data);
    return redeem;
  } catch (error) {
    console.log("error in RedeemRepo", error);
    throw error;
  }
};

export const getAllRedemptionsOfUser = async function (id) {
  try {
    const redeem = await REDEMPTION.find({ userId: id }); // find({ field: value }) → when querying by ownership / relation
    return redeem;
  } catch (error) {
    console.log("error in RedeemRepo", error);
    throw error;
  }
};
