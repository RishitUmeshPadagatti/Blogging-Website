import { Hono } from "hono";
import { getAllTags, getBlogsByASpecificTag } from "../controllers/tagController";
import { authMiddleware } from "../middleware/authMiddleware";

const tagRouter = new Hono()
tagRouter.use("*", authMiddleware)

// Getting all blogs by their tag name
tagRouter.get("/getblogs/:tagname", getBlogsByASpecificTag)

// Getting all the tags
tagRouter.get("/tags", getAllTags)

export default tagRouter