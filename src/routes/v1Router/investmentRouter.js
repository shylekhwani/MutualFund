import express from "express";
import {
  createInvestmentController,
  getAllInvestmentsController,
} from "../../controller/investmentController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";

const investRouter = express.Router();

investRouter.get("/", isAuthenticated, getAllInvestmentsController);
investRouter.post("/create", isAuthenticated, createInvestmentController);

export default investRouter;
