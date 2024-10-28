 import {PinoLogger} from "hono-pino";
 import {OpenAPIHono, RouteConfig, RouteHandler} from "@hono/zod-openapi";

 export type AppBindings= {
    Variables:{
        logger: PinoLogger,
    }
}

export type AppOpenAPI = OpenAPIHono<AppBindings>

 export type AppRouteHandler<T extends RouteConfig> = RouteHandler<T,AppBindings>