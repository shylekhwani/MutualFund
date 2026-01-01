import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minLength: 5,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please fill valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    balance: {
      type: Number,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("investments", {
  // “Match User._id with Investment.userId”
  ref: "INVESTMENT",
  localField: "_id", // 👉 Field from THIS schema (user)
  foreignField: "userId", // 👉 Field from OTHER schema (Investment)
});

userSchema.virtual("redemptions", {
  // “Match User._id with Investment.userId”
  ref: "REDEMPTION",
  localField: "_id",
  foreignField: "userId", // 👉 Field from OTHER schema (Investment)
});

userSchema.pre("save", async function modifyBalanceandPassword() {
  const user = this;

  // set default balance only on new user
  if (user.isNew) {
    user.balance = 100000;
  }

  // only hash password if modified
  if (!user.isModified("password")) return;

  const SALT = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, SALT);
});

const USER = mongoose.model("USER", userSchema);

export default USER;
