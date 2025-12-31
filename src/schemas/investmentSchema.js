import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },

    fundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MutualFund",
      required: true,
    },

    fundName: {
      type: String,
      ref: "MutualFund",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    navAtBuy: {
      type: Number,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const INVESTMENT = mongoose.model("INVESTMENT", investmentSchema);
