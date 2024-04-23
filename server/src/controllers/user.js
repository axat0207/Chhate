import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/features.js";

export async function register(req, res) {
  const { fullName, bio, username, email, password, avatar } = req.body;

  try {
    const userExist = await User.findOne({ $or: [{ username }, { email }] });

    if (userExist) {
      return res.status(409).send("User already exists.");
    }

    // Hash the password before saving it to database
    const hashedPassword = await bcrypt.hash(password, 10);

    const registereduser = await User.create({
      fullName,
      bio,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    if (!registereduser) {
      return res.status(500).json({ message: "Something Went wrong." });
    }

    if (req.cookies.accessToken) {
      res.clearCookie("accessToken", {
        maxAge: 15 * 1000 * 60 * 60 * 24,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      });
    }
    const userForToken = await User.findOne({ $or: [{ username }, { email }] });
    sendToken(res, userForToken, 201, "User Created Sucessfully");
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { username, email, password } = req.body;
  try {
    const UserExist = await User.findOne({ $or: [{ email }, { username }] });
    if (!UserExist) {
      res.status(400).json({
        status: "error",
        message: `Email or username does not exist
              Please sign up`,
      });
    }
    const isValidPassword = await bcrypt.compare(password, UserExist.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "error",
        message: `Invalid Password`,
      });
    }
   

    sendToken(res, UserExist, 200, "Logged In sucessfully");
  } catch (error) {
    res.status(500).json({
      status: "Server error",
      message: `${error.message}`,
    });
  }
}

export async function logout(req, res) {
  try {
    await res.clearCookie("accessToken", {
      maxAge: 15 * 1000 * 60 * 60 * 24,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.status(200).send("logged out");
  } catch (error) {
    throw new error.message
  }
}

export async function getUser(req,res){
  try {

    const user = await User.findById(req.user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error.message)
  }
}
