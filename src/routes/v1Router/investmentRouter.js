import express from "express";
import {
  createInvestmentController,
  getAllInvestmentsController,
} from "../../controller/investmentController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const investRouter = express.Router();

investRouter.get("/", isAuthenticated, getAllInvestmentsController);
investRouter.post("/create", createInvestmentController);

export default investRouter;
