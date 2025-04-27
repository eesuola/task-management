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

export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.body.userId; // <-- get user id from form-data
    const photoPath = req.file.path; // multer gives you the uploaded file info

    // Now update user in DB
    const user = await User.findByIdAndUpdate(userId, { profilePicture: photoPath }, { new: true });

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const uploadProfilePic = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     if (!user) 
//       throw new error('User not found');
//     if (req.file) {
//       user.profilePicture = req.file.buffer;
//       await user.save();
//     }
    
//     res.status(200).json({
//       status: 'success ',
//       message:'Profile Picture Uploaded Successfully'
//     })
//   } catch (error) {
//     console.error(error.message);
//     res.status(400).json({
//     success: false,
//     message: error.message,
//   });
//   }
// }
