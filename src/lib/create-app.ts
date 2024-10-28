import {OpenAPIHono} from "@hono/zod-openapi";
import {notFound, onError, serveEmojiFavicon} from "stoker/middlewares";
import {pinoLogger} from "hono-pino";
import {AppBindings, AppOpenAPI} from "@/lib/types";
import {defaultHook} from "stoker/openapi";


export   function createRouter(){
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    })
}


export default function  createApp(){
    const app = createRouter();

    app.use(pinoLogger())

    app.use(serveEmojiFavicon("📝"))

    app.onError(onError)
    app.notFound(notFound)

    return app
}

export  function  createTestApp(router: AppOpenAPI){
    const testApp = createRouter();

   testApp.route("/",router)

    return testApp
}