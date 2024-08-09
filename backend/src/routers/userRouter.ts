import { Hono } from "hono";
import { signInController, signUpController } from "../controllers/userController";

const userRouter = new Hono()

userRouter.post("/signup", signUpController)
userRouter.post("/signin", signInController)

export default userRouter