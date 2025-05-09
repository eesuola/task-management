import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {}).then(
    () => {
      console.log(`connected to db ${url}`);
    },
    (error) => {
      console.log(error);
    },
  );
};

export default connectDB;
