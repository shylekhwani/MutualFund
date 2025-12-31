import express from "express";
import { isAdmin, isAuthenticated } from "../../middlewares/authMiddleware.js";
import {
  createFundController,
  getAllFundsController,
  getFundByIdController,
  updateNavController,
} from "../../controller/mutualFundController.js";

const fundRouter = express.Router();

fundRouter.get("/", isAuthenticated, getAllFundsController);
fundRouter.get("/:id", isAuthenticated, getFundByIdController);
fundRouter.post("/create", isAuthenticated, isAdmin, createFundController);
fundRouter.patch("/update/:id", isAuthenticated, isAdmin, updateNavController);

export default fundRouter;
