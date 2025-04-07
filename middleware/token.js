import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const checkToken = (req, res, next) => {
  try {
    const token = req.header("authorization");
    console.log(token);
    if (!token.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Token must be bearer",
      });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const extractedToken = token.split(" ")[1];
    const payload = jwt.verify(extractedToken, jwtSecret);
    console.log(payload);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token, Unauthorized",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
