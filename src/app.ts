
import createApp from "@/lib/create-app";
import configureOpenAPI from "@/lib/config.openapi";
import indexRoute from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";




const app =  createApp()

const routes =[
    indexRoute,
    tasks

] as const;

export type  AppType = typeof routes[number];


 configureOpenAPI(app)
routes.forEach((route)=>{
    app.route("/", route)
})




export default  app;