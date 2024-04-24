import { body, check, validationResult } from "express-validator";

export const registerValidator = () => [
  body("fullName").notEmpty().withMessage("Please provide full Name"),
  body("username").notEmpty().withMessage("Please provide a username"),
  body("bio").notEmpty().withMessage("Please provide bio"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  check("avatar").notEmpty().withMessage("Please provide avatar")
];
export const loginValidator = () => [
  body("username").notEmpty().withMessage("Please provide a username"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];
export const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors
    .array()
    .map((err) => err.msg)
    .join(", ");
  res.status(422).json({ errors: errorMessage || null });
  console.log(errorMessage);
  if (!errors) return next();
};
