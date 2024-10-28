import {createRouter} from "@/lib/create-app";
import {createRoute} from "@hono/zod-openapi";
import {z} from "zod";
import {jsonContent} from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {createMessageObjectSchema} from "stoker/openapi/schemas";

const router = createRouter()
    .openapi(createRoute({
        tags: ["Task"],
        method: "get",
        path: "/",
        responses:{
            [HttpStatusCodes.OK]: jsonContent(
                createMessageObjectSchema(),
                "Task API"
            )
        }
    }),
        (c)=>{
        return c.json({message: "Task API"},HttpStatusCodes.OK)
}
    );

export default router