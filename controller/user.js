import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();


//Register a new user

export const registration = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new Error("Please fill all the fields");
    }
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
    // check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      throw new Error("User already exists");
    }
  
    
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
    
  }
};

export const login = async (req, res) => {
  try {
    //console.log(req.body);
    //
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await User.findOne({ email: email });

  
    if (!existingUser) {
      throw new Error("Email not registered");
    }
    
    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const payload = {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };

    const secret = process.env.JWT_SECRET;

    const jwtOptions = {
      expiresIn: "45days",
      // algorithm: "HS256",
    };
    const token = jwt.sign(payload, secret, jwtOptions);
    console.log(token);

    res.status(201).json({
      success: true,
      message: `Welcome ${existingUser.name}`,
      token: token,
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
    //console.log(error);
  }
};
