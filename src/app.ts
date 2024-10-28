import {OpenAPIHono} from "@hono/zod-openapi";
import {serveEmojiFavicon} from "stoker/middlewares";

import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/config.openapi";
import indexRoute from "@/routes/index.route";




const app =  createApp()

const routes =[
    indexRoute

];
 configureOpenAPI(app)
routes.forEach((route)=>{
    app.route("/", route)
})




export default  app;