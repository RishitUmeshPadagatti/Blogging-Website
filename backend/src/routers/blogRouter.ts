import { Hono } from "hono";
import { creatingBlog, deleteABlog, getABlog, getBulkPublishedBlogs, publishABlog, unPublishABlog, updatingBlog } from "../controllers/blogController";
import { authMiddleware } from "../middleware/authMiddleware";

const blogRouter = new Hono()
blogRouter.use('*', authMiddleware);

// Creating a blog
blogRouter.post("/", creatingBlog)

// Updating a blog
blogRouter.put("/:id", updatingBlog)

// Getting all the published blogs
blogRouter.get("/bulk", getBulkPublishedBlogs)

// Publishing a specific blog
blogRouter.post("/publish/:id", publishABlog)

// Unpublishing a specific blog
blogRouter.post("/unpublish/:id", unPublishABlog)

// Getting a specific blog of any user
blogRouter.get("/:id", getABlog)

// Delete a specific blog 
blogRouter.delete("/:id", deleteABlog)

export default blogRouter