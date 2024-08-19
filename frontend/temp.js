import { createBlogSchema } from "@rishit1275/blogging-website-package"

// Example usage:
const result = createBlogSchema.safeParse({
    title: "How AI is Revolutionizing Healthcare",
    content: "An in-depth look at how artificial intelligence is improving patient care, diagnostic processes, and healthcare management.",
    tags: []
});

console.log(result.error.errors[0].message);