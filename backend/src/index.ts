import { Hono } from 'hono'
import userRouter from './routers/userRouter'
import blogRouter from './routers/blogRouter'
import tagRouter from './routers/tagRouter'
import { cors } from 'hono/cors'

const app = new Hono()
app.use("*", cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)
app.route("/api/v1/tag", tagRouter)

export default app
