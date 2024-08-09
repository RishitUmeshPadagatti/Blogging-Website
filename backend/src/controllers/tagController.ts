import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { ResponseCode } from "../responseCodes/responseCodes";

const selectingStuff = {
    id: true,
    title: true,
    content: true,
    published: true,
    created: true,
    author: {
        select: {
            name: true
        }
    },
    authorId: true,
    tags: {
        select: {
            name: true
        }
    }
}

export async function getBlogsByASpecificTag(c:Context) {
    try {
        const requestedTag = String(c.req.param("tagname"))

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const doesTagExist = await prisma.tag.findFirst({
            where: {name: requestedTag}
        })

        if (!doesTagExist){
            return c.json({msg: "Tag doesn't exist", success: false}, ResponseCode.notFound)
        }

        const result = (await prisma.tag.findMany({
            where: {
                name: requestedTag,
            },
            select: {
                blogs: {
                    select: selectingStuff,
                },
            },
        }))[0].blogs;

        if (result.length == 0){
            c.json({msg: "No Blogs"}, ResponseCode.badRequest)
        }

        return c.json({msg: "Found Blogs with the Tag", success: true, blogs: result}, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false}, ResponseCode.internalServerError)
    }
}

export async function getAllTags(c:Context) {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        
        const result = await prisma.tag.findMany({
            orderBy: {
                name: "asc"
            }
        })

        if (result.length == 0){
            return c.json({msg: "No tags", success: false}, ResponseCode.badRequest)
        }

        return c.json({msg: "Tags Found", success: true, tags: result}, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error" , success: false}, ResponseCode.internalServerError)
    }
}