import mongoose from "mongoose";

const mutualFundSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Equity", "Debt", "Hybrid"],
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    nav: {
      type: Number,
      required: true,
    },

    expenseRatio: {
      type: Number,
      default: 0,
    },

    minInvestment: {
      type: Number,
      default: 500,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const MutualFund = mongoose.model("MutualFund", mutualFundSchema);
