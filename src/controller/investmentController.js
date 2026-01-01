import {
  createInvestmentService,
  fetchInvestmentsUserService,
} from "../services/investmentService.js";

export const createInvestmentController = async function (req, res, next) {
  try {
    const userId = req.user.user.id;
    // console.log("UserId", userId);
    const data = { ...req.body, userId };
    const newInvest = await createInvestmentService(data);
    return res.status(201).json({
      success: true,
      message: "Investment created successfully",
      data: newInvest,
    });
  } catch (error) {
    next(error);
    console.log("Internal server error on controller");
  }
};

export async function getAllInvestmentsController(req, res, next) {
  try {
    const { id } = req.user;
    const investments = await fetchInvestmentsUserService(id);

    return res.status(200).json({
      success: true,
      message: "Investments fetched successfully",
      data: investments,
    });
  } catch (error) {
    console.error("Error in getAllInvestmentsController:", error);
    next(error);
  }
}
