import {OpenAPIHono} from "@hono/zod-openapi";
import {serveEmojiFavicon} from "stoker/middlewares";

import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/config.openapi";
import indexRoute from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";




const app =  createApp()

const routes =[
    indexRoute,
    tasks

];
 configureOpenAPI(app)
routes.forEach((route)=>{
    app.route("/", route)
})




export default  app;