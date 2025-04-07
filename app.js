import connectDB from "./db/connect.js";
import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import registrationRoute from "./routes/user.js";
import {logToTerminal} from "./middleware/loggers.js";

configDotenv();

const connectionString = process.env.MONGO_URI;
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", logToTerminal, registrationRoute);
const HOST = "localhost";


app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(PORT, HOST, async () => {
    await connectDB(connectionString);
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
  