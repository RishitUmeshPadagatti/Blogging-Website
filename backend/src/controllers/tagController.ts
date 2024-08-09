import { Context } from "hono";

export async function getPostsByASpecificTag(c:Context) {
    c.text("Getting posts by a specific tag")
}

export async function getAllTags(c:Context) {
    c.text("Getting all tags")
}