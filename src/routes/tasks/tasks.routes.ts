import {createRoute,z} from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {jsonContent, jsonContentRequired} from "stoker/openapi/helpers";
import {insertTasksSchema, patchTasksSchema, selectTasksSchema} from "@/db/schemas";
import {createErrorSchema, IdParamsSchema} from "stoker/openapi/schemas";
import {notFoundSchema} from "@/lib/constants";


export  const list =createRoute({
    path: "/tasks",
    tags: ["Task"],
    method: "get",
    responses:{
        [HttpStatusCodes.OK]: jsonContent(
           z.array(selectTasksSchema),
            "List of tasks"
        )
    },

});
export  const getOne =createRoute({
    path: "/tasks/{id}",
    tags: ["Task"],
    method: "get",
    request:{
        params: IdParamsSchema
    } ,
    responses:{
        [HttpStatusCodes.OK]: jsonContent(
           selectTasksSchema,
            "get a task with id"
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
           notFoundSchema,
            "Task not found",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid id error"
        )
    },


});

export  const create =createRoute({
    path: "/tasks",
    tags: ["Task"],
    method: "post",
    request:{
        body: jsonContentRequired(
            insertTasksSchema,
            "Create a  task"
        )
    },
    responses:{
        [HttpStatusCodes.OK]: jsonContent(
          selectTasksSchema,
            "Create a  task"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
           createErrorSchema(insertTasksSchema),
            "Validation error"
        )
    },

});


export  const update =createRoute({
    path: "/tasks/{id}",
    tags: ["Task"],
    method: "patch",
    request:{
        params: IdParamsSchema,
        body: jsonContentRequired(
            patchTasksSchema,
            "Update a  task"
        )
    },
    responses:{
        [HttpStatusCodes.OK]: jsonContent(
          selectTasksSchema,
            "Updated task"
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
           createErrorSchema(patchTasksSchema)
               .or(createErrorSchema(IdParamsSchema)),
            "Validation error"
        ),

        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Task not found",
        ),
    },

});

export  const remove =createRoute({
    path: "/tasks/{id}",
    tags: ["Task"],
    method: "delete",
    request:{
        params: IdParamsSchema,
    },
    responses:{
        [HttpStatusCodes.NO_CONTENT]: {
            description: "Task deleted ",
},
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
           (createErrorSchema(IdParamsSchema)),
            "Validation error"
        ),

        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Task not found",
        ),
    },

});



export type  ListRoute = typeof list;

export type  CreateRoute = typeof create;

export type  GetOneRoute = typeof getOne;

export type  UpdateRoute = typeof update;
export type  RemoveRoute = typeof remove;