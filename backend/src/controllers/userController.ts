import { Context } from "hono";
import { Jwt } from "hono/utils/jwt";
import { ResponseCode } from "../responseCodes/responseCodes";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInParams, signInSchema, signUpParams, signUpSchema } from "@rishit1275/blogging-website-package";


// For signing up
export async function signUpController(c:Context) {
    try {
        const body: signUpParams = await c.req.json();

        const parsingResult = signUpSchema.safeParse(body)
        if (!parsingResult.success) {
            return c.json({msg: parsingResult.error.errors[0].message, success: false}, ResponseCode.badRequest)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const userExistsOrNot = await prisma.user.findFirst({
            where: {email: body.email}
        })

        if (userExistsOrNot) {
            return c.json({msg: "Email already exists", success: false}, ResponseCode.badRequest)
        }

        const result = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        const token = await Jwt.sign(result, c.env.JWT_PASSWORD)

        return c.json({
            msg: "User Created Successfully",
            success: true,
            token: token,
            user: result
        })
    } catch (error) {
        console.log(error)
        return c.json({msg: "Internal Server Error", success: false}, ResponseCode.internalServerError)
    }
}

// For signing in
export async function signInController(c:Context) {
    try {
        const body: signInParams = await c.req.json();

        const parsingResult = signInSchema.safeParse(body)
        if (!parsingResult.success) {
            return c.json({msg: parsingResult.error.errors[0].message, success: false}, ResponseCode.badRequest)
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const result = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (result == null){
            return c.json({msg: "Invalid Credentials", success: false}, ResponseCode.badRequest)
        }

        const token = await Jwt.sign(result, c.env.JWT_PASSWORD)

        return c.json({
            msg: "User Signed In",
            success: true,
            token: token,
            user: result
        })
        

    } catch (error) {
        return c.json({msg: "Internal Server Error", success: false}, ResponseCode.internalServerError)
    }
}

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

// Get all the blogs of a user
export async function getAllBlogsOfAUser(c: Context) {
    try {
        const requestedAuthorId = String(c.req.param("authorId"))

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const doesUserExist = await prisma.user.findFirst({
            where: { id: requestedAuthorId }
        })

        if (!doesUserExist) {
            return c.json({ msg: "User doesn't exist", success: false }, ResponseCode.notFound)
        }

        let result;
        const publish = c.get("authorId") === requestedAuthorId ? null : false;

        if (publish === null) {
            result = await prisma.user.findFirst({
                where: {
                    id: requestedAuthorId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    posts: {
                        select: selectingStuff
                    }
                }
            })
        }
        else if (publish === false) {
            result = await prisma.user.findFirst({
                where: {
                    id: requestedAuthorId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    posts: {
                        where: {
                            published: true
                        },
                        select: selectingStuff
                    }
                }
            })
        }

        return c.json({msg: "Found User with their information", success: true, user: result}, ResponseCode.success)

    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
}