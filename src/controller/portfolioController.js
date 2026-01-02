import { getUserPortfolioService } from "../services/portfolioService.js";

export const getUserPortfolioController = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const userId = req.user.id;

    const portfolio = await getUserPortfolioService(userId);

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    console.log("error in getUserPortfolioController", error);
    next(error);
  }
};
