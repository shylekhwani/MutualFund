import { createRedemptionService } from "../services/redemptionService.js";

export const createRedemptionController = async function (req, res, next) {
  try {
    const userId = req.user.id;
    // console.log("UserId", userId);
    const data = { ...req.body, userId };
    console.log(data);
    const redeem = await createRedemptionService(data);
    return res.status(201).json({
      success: true,
      message: "Redemption happened successfully",
      data: redeem,
    });
  } catch (error) {
    next(error);
    console.log("Internal server error on controller");
  }
};
