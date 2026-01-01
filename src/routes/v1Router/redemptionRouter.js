import express from "express";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { createRedemptionController } from "../../controller/redemptionController.js";

const redeemRouter = express.Router();

// redeemRouter.get("/", isAuthenticated, getAllInvestmentsController);
redeemRouter.post("/", isAuthenticated, createRedemptionController);

export default redeemRouter;
