import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {OpenAPIHono} from "@hono/zod-openapi";
import app from "@/app";
import * as process from "node:process";
import env from "@/env";


const port =  3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
   port
})
