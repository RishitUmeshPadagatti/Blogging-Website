import { Context } from "hono";
import { signInParams, signInSchema, signUpParams, signUpSchema } from "../zod/allZodSchemas"
import { Jwt } from "hono/utils/jwt";
import { ResponseCode } from "../responseCodes/responseCodes";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

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