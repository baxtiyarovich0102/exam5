import { Router } from "express";
import authController from "../controllers/auth.controller";
import { userValidator, loginValidation } from "../middlewares/vali.middleware";
let route: any = Router()


route.post("/register", userValidator, authController.register)
route.post("/login", loginValidation, authController.login)



export default route