import { Hono } from "hono";
import { signInController, signUpController } from "../controllers/userController";

const userRouter = new Hono()

// For signing up
userRouter.post("/signup", signUpController)

// For signing in
userRouter.post("/signin", signInController)

export default userRouter