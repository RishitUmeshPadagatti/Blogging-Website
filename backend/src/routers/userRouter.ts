import { Hono } from "hono";
import { getAllBlogsOfAUser, signInController, signUpController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = new Hono()

// For signing up
userRouter.post("/signup", signUpController)

// For signing in
userRouter.post("/signin", signInController)

// Getting all the blogs of a user
userRouter.get("/getblogs/:authorId", authMiddleware, getAllBlogsOfAUser)

export default userRouter