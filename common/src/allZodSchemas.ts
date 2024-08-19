import { z } from "zod"

export const signUpSchema = z.object({
    name: z.string()
        .min(3, "Name should atleast be 3 characters long")
        .max(40, "Name should at most 40 characters long"),
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(6, "Password should be at least 6 characters long")
})
export type signUpParams = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(6, "Password should be at least 6 characters long")
})
export type signInParams = z.infer<typeof signInSchema>

export const createBlogSchema = z.object({
    title: z.string()
        .min(3, "Title should be at least 3 characters long")
        .max(80, "Title should be at most 80 characters long"),
    content: z.string()
        .min(5, "Content should be at least 5 characters long"),
    tags: z.array(z.string()
        .min(1, "Tag cannot be empty")
        .regex(/^[\w-]+$/, "Each tag must be a single word with letters, numbers, or hyphens"))
        .max(10, "You can specify at most 10 tags")
        .refine(tags => tags.length > 0, "At least one tag is required")
});
export type blogParams = z.infer<typeof createBlogSchema>

export const tagSchema = z.object({
    name: z.string()
        .min(1, "Tag name cannot be empty")
        .max(30, "Tag name should be at most 30 characters long")
});
export type tagParams = z.infer<typeof tagSchema>