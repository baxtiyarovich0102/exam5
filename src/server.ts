import { errorHandler } from "./utils/errorHandler"
import {errorController} from "./controllers/err.controller"
import { config } from "dotenv";
import { sequelize } from "./config/db.config";
import express, { Response } from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route"
import "./models/ref.model"


config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
(async () => {
  await sequelize.sync();
  console.log("Connected to DB*");
})();

app.use('/auth', authRouter)
app.use(userRouter)

app.use(errorController)
app.use(errorHandler)
app.use((err: any, res: Response) => {
  const status = err.status || 500;
  console.log(status);

  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status: status,
    },
  });
});

let PORT = process.env.PORT;

app.listen(PORT, () => console.log("This server is running on", PORT));
