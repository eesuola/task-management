import mongoose from "mongoose";
import bcrypt from "bcrypt";


const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  isAdmin:{
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
  },
  
  
}, { timestamps: true });

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);

  if (this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);
export default User;