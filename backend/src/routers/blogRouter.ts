import { Hono } from "hono";
import { creatingBlog, getABlog, getBulkBlog, updatingBlog } from "../controllers/blogController";

const blogRouter = new Hono()

blogRouter.post("/", creatingBlog)
blogRouter.put("/", updatingBlog)
blogRouter.get("/bulk", getBulkBlog)
blogRouter.get("/:id", getABlog)

export default blogRouter