import { Next } from "hono";
import { Context } from "hono/jsx";
import { Jwt } from "hono/utils/jwt";
import { ResponseCode } from "../responseCodes/responseCodes";

export async function authMiddleware(c: Context, next: Next){
    try {
        const receivedToken: string|undefined|null = c.req.header("Authorization").split(" ")[1]
        
        if(receivedToken){
            try {
                const verification = await Jwt.verify(receivedToken, c.env.JWT_PASSWORD)
                c.set("authorId", verification.id)
                await next() // to wait the next middleware
            } catch (error) {
                return c.json({msg: "Invalid Credentials", success: false}, ResponseCode.forbidden)
            }
        }
        else{
            return c.json({msg: "Improper Inputs", success: false}, ResponseCode.forbidden)
        }
    } catch (error) {
        console.log(error)
        return c.json({ msg: "Internal Server Error", success: false }, ResponseCode.internalServerError)
    }
    
}