import { Hono } from "hono";
import { getAllTags, getPostsByASpecificTag } from "../controllers/tagController";

const tagRouter = new Hono()

tagRouter.get("/getpost/:tag", getPostsByASpecificTag)
tagRouter.post("/tags", getAllTags)

export default tagRouter