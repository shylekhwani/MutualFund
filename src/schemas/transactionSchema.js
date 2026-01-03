import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
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
      required: true,
    },

    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    units: {
      type: Number,
      required: true,
    },

    nav: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const TRANSACTION = mongoose.model("TRANSACTION", transactionSchema);

export default TRANSACTION;
