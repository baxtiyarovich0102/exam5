import { Router } from "express";
import userController from "../controllers/user.controller"
import { checkToken } from "../middlewares/auth.middleware";

let route = Router()
route.get("/users", checkToken, userController.getAllUsers)
route.get("/users/:id", checkToken, userController.getuserById)
route.put("/users/:id", checkToken, userController.updateUser)
route.delete("/users/:id", checkToken, userController.deleteUser)
export default route