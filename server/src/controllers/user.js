import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { fullName, username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ $or: [{ username }, { email }] });

    if (userExist) {
      return res.status(409).send("User already exists.");
    }

    // Hash the password before saving it to database
    const hashedPassword = await bcrypt.hash(password, 10);
 
    
    const registereduser = await User.create({
      fullName,
      username,
      email,
      password : hashedPassword,
    });

    if (!registereduser) {
        return res.status(500).json({ message: "Something Went wrong." });
      }
      const options = {
        httpOnly: true,
        secure: true,
      };
      if (req.cookies.accessToken) {
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);
      }
   

    res.status(201).json({
      status: "success",
      message: "User has been created",
      data: registereduser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const UserExist = await User.findOne({ email });
    if (!UserExist) {
      res.status(400).json({
        status: "error",
        message: `Email ${email} does not exist
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
  
    const accessToken = jwt.sign(
      {
        email: UserExist.email,
        id: UserExist._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
  
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    res.cookie("accessToken", accessToken, options);
    
  
  
    res.status(200).json({
      status: "succes",
      token: accessToken,
    });
  
  } catch (error) {
    res.status(500).json({
      status: "Server error",
      message: `${error.message}`,
      })
  }}
