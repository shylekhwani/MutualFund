import {
  createUser,
  findUserByEmail,
  findAllUser,
  getUserById,
} from "../repository/userRepository.js";
import { createJWT } from "../utils/authJWT.js";
import bcrypt from "bcrypt";

export const createUserService = async function (user) {
  try {
    const newUser = await createUser(user);

    return newUser;
  } catch (error) {
    console.log("Error in createUserService:", error); // Debug log
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw {
        status: 400,
        message: "User with same email or username already exists",
      };
    } else {
      throw error; // Re-throw other errors
    }
  }
};

export const loginUserService = async function (userDetails) {
  try {
    // check if there is valid registred user with the email
    const user = await findUserByEmail(userDetails.email);

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }
    // comapre the password
    const isPasswordValid = bcrypt.compareSync(
      userDetails.password,
      user.password
    );

    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid Password",
      };
    }

    //  console.log("Payload for JWT:", { id: user.id, email: user.email, username: user.username });

    return {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
      token: createJWT({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  } catch (error) {
    console.log("SignIn service error", error);
    throw error;
  }
};

export const getAllUserService = async function () {
  try {
    const user = await findAllUser();
    return user;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error; // Pass the error to the controller
  }
};

export const getUserByIdService = async function (id) {
  try {
    const user = await getUserById(id);
    return user;
  } catch (error) {
    console.error("Error in getUserByIdService:", error);
    throw error; // Pass the error to the controller
  }
};
