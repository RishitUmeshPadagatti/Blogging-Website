import { Context } from "hono";

export async function creatingBlog(c:Context) {
    return c.text("Create Blog")
}

export async function updatingBlog(c:Context) {
    return c.text("Update Blog")
}

export async function getABlog(c:Context) {
    return c.text("Get a Blog")
}

export async function getBulkBlog(c:Context) {
    return c.text("Returning all the blogs")
}