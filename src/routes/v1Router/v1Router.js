import express from "express";
import userRouter from "./usersRouter.js";
import fundRouter from "./mutualFundRouter.js";
import investRouter from "./investmentRouter.js";
import redeemRouter from "./redemptionRouter.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/funds", fundRouter);
v1Router.use("/invest", investRouter);
v1Router.use("/redeem", redeemRouter);

export default v1Router;
