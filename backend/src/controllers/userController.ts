import { Context } from "hono";

export async function signUpController(c:Context) {
    return c.text("signup!!")
}

export async function signInController(c:Context) {
    return c.text("signin!!")
}