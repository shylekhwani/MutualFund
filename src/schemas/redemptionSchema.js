import mongoose from "mongoose";

const redemptSchema = new mongoose.Schema(
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

    investId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "INVESTMENT",
      required: true,
    },

    fundName: {
      type: String,
      required: true,
    },

    unitsToSell: {
      type: Number,
      required: true,
    },

    navAtSell: {
      type: Number,
      required: true,
    },

    amountCredited: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const REDEMPTION = mongoose.model("REDEMPTION", redemptSchema);
