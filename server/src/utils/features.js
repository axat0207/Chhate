import jwt from "jsonwebtoken";
const cookieOptions = {
  maxAge: 15 * 1000 * 60 * 60 * 24,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
export const sendToken = (res, user, code, message) => {
  
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  return res.status(code).cookie("accessToken", token, cookieOptions).json({
    sucess: true,
    message,
    user,
    token
  });
};
