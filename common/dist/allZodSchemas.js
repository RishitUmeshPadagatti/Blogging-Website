"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSchema = exports.createBlogSchema = exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(3, "Username should atleast be 3 characters long")
        .max(20, "Username should at most 20 characters long"),
    email: zod_1.z.string()
        .email("Invalid email address"),
    password: zod_1.z.string()
        .min(6, "Password should be at least 6 characters long")
});
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string()
        .email("Invalid email address"),
    password: zod_1.z.string()
        .min(6, "Password should be at least 6 characters long")
});
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string()
        .min(3, "Title should be at least 3 characters long")
        .max(80, "Title should be at most 80 characters long"),
    content: zod_1.z.string()
        .min(5, "Content should be at least 5 characters long"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tag cannot be empty"))
        .max(10, "You can specify at most 10 tags")
});
exports.tagSchema = zod_1.z.object({
    name: zod_1.z.string()
        .min(1, "Tag name cannot be empty")
        .max(30, "Tag name should be at most 30 characters long")
});
