import express from "express";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { getUserPortfolioController } from "../../controller/portfolioController.js";

const portfolioRouter = express.Router();

portfolioRouter.get("/", isAuthenticated, getUserPortfolioController);

export default portfolioRouter;
