import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/User.Route.js";
import { connectDB } from "./database/index.js";
import { GlobalError } from "./utils/GlobalError.js";

dotenv.config({
  path: "../.env",
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({
    data: res.cookie,
  });
});

app.use("/api/v1/auth", authRouter);

app.use(GlobalError);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running at : http://localhost:${PORT}/api/v1/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
