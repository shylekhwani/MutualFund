import { INVESTMENT } from "../schemas/investmentSchema.js";

export const createInvestment = async function (data) {
  try {
    const newInvest = await INVESTMENT.create(data);
    return newInvest;
  } catch (error) {
    console.log("error in InvestRepo", error);
    throw error;
  }
};

export const getAllInvestmentsOfUser = async function (id) {
  try {
    const invest = await INVESTMENT.find({ userId: id }); // find({ field: value }) → when querying by ownership / relation
    return invest;
  } catch (error) {
    console.log("error in investRepo", error);
    throw error;
  }
};

export const getInvestmentById = async function (id) {
  try {
    const invest = await INVESTMENT.findById(id);
    return invest;
  } catch (error) {
    console.log("error in investRepo", error);
    throw error;
  }
};
