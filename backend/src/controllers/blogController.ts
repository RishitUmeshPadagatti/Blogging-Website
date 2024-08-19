import { Context } from "hono";
import { ResponseCode } from "../responseCodes/responseCodes";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogParams, createBlogSchema } from "@rishit1275/blogging-website-package";

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

const isValidTags = (tags: string[]): boolean => {
    const areSingleWords = tags.every(tag => tag.split(" ").length === 1);
    const hasUniqueTags = new Set(tags).size === tags.length;

    return areSingleWords && hasUniqueTags;
};

// Creating a blog
export async function creatingBlog(c: Context) {
    try {
        const body: blogParams = await c.req.json()

        const parsingResult = createBlogSchema.safeParse(body)
        if (!parsingResult.success) {
            return c.json({ msg: parsingResult.error.errors[0].message, success: false }, ResponseCode.badRequest)
        }

        // checks if the tags are single words and aren't repeated
        const parsingResult2 = isValidTags(body.tags)
        if (!parsingResult2) {
            return c.json({ msg: "Tags should be single, unique words", success: false }, ResponseCode.badRequest);
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const authorId = c.get("authorId")

        const result = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                tags: {
                    connectOrCreate: body.tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag }
                    }))
                }
            }
        })

        return c.json({ msg: "Blog Created Successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Updating a blog
export async function updatingBlog(c: Context) {
    try {
        const requestId = c.req.param("id")
        const authorId = c.get("authorId")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogExistOrNot = await prisma.blog.findFirst({
            where: {
                id: requestId,
                authorId: authorId
            }
        })

        if (!blogExistOrNot) {
            return c.json({ msg: "Blog doesn't exist", success: false }, ResponseCode.notFound)
        }

        const body: blogParams = await c.req.json()

        const parsingResult = createBlogSchema.safeParse(body)
        if (!parsingResult.success) {
            return c.json({ msg: parsingResult.error.errors[0].message, success: false }, ResponseCode.badRequest)
        }

        // checks if the tags are single words and aren't repeated
        const parsingResult2 = isValidTags(body.tags)
        if (!parsingResult2) {
            return c.json({ msg: "Tags should be single, unique words", success: false }, ResponseCode.badRequest);
        }

        await prisma.blog.update({
            where: {
                id: requestId
            },
            data: {
                tags: {
                    set: []
                }
            }
        });

        const result = await prisma.blog.update({
            where: {
                id: requestId,
                authorId: authorId
            }, data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
                tags: {
                    connectOrCreate: body.tags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag }
                    }))
                }
            },
            select: selectingStuff
        })

        return c.json({ msg: "Blog Updated successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Getting all the published blogs
export async function getBulkPublishedBlogs(c: Context) {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const result = await prisma.blog.findMany({
            where: {
                published: true
            },
            orderBy: {
                created: 'desc'
            }, select: selectingStuff
        })

        if (result.length == 0) {
            return c.json({ msg: "No Published Blogs", success: false }, ResponseCode.notFound)
        }

        return c.json({ msg: "Blogs Found successfully", success: true, blogs: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Publishing a specific blog
export async function publishABlog(c: Context) {
    try {
        const requestId = c.req.param("id")
        const authorId = c.get("authorId")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogExistOrNot = await prisma.blog.findFirst({
            where: {
                id: requestId,
                authorId: authorId
            }
        })

        if (!blogExistOrNot) {
            return c.json({ msg: "Blog doesn't exist", success: false }, ResponseCode.notFound)
        }

        const result = await prisma.blog.update({
            where: {
                id: requestId,
                authorId: authorId
            }, data: {
                published: true
            }, select: selectingStuff
        })

        return c.json({ msg: "Blog published successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Unpublishing a specific blog
export async function unPublishABlog(c: Context) {
    try {
        const requestId = c.req.param("id")
        const authorId = c.get("authorId")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogExistOrNot = await prisma.blog.findFirst({
            where: {
                id: requestId,
                authorId: authorId
            }
        })

        if (!blogExistOrNot) {
            return c.json({ msg: "Blog doesn't exist", success: false }, ResponseCode.notFound)
        }

        const result = await prisma.blog.update({
            where: {
                id: requestId,
                authorId: authorId
            }, data: {
                published: false
            }, select: selectingStuff
        })

        return c.json({ msg: "Blog unpublished successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Getting a specific blog of any user
export async function getABlog(c: Context) {
    try {
        const requestId = c.req.param("id")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const result = await prisma.blog.findFirst({
            where: {
                id: requestId,
                published: true
            }, select: selectingStuff
        })

        if (!result) {
            return c.json({ msg: "Blog doesn't exist", success: false }, ResponseCode.notFound)
        }

        return c.json({ msg: "Found blog successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}

// Delete a specific blog 
export async function deleteABlog(c: Context) {
    try {
        const requestId = c.req.param("id")
        const authorId = c.get("authorId")

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const blogExistOrNot = await prisma.blog.findFirst({
            where: {
                id: requestId,
                authorId: authorId
            }
        })

        if (!blogExistOrNot) {
            return c.json({ msg: "Blog doesn't exist", success: false }, ResponseCode.notFound)
        }

        const result = await prisma.$transaction(async (prisma) => {
            const deletedBlog = await prisma.blog.delete({
                where: {
                    id: requestId,
                    authorId: authorId
                },
                select: selectingStuff
            });

            await prisma.tag.deleteMany({
                where: {
                    blogs: {
                        none: {},
                    },
                },
            });

            return deletedBlog;
        });

        return c.json({ msg: "Deleted blog successfully", success: true, blog: result }, ResponseCode.success)
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}