import TRANSACTION from "../schemas/transactionSchema.js";

export const createTransaction = async function (data) {
  try {
    const newTran = await TRANSACTION.create(data);
    return newTran;
  } catch (error) {
    console.log("error in TranRepo", error);
    throw error;
  }
};
