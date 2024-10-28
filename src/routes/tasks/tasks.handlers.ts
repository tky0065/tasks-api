
import {CreateRoute, GetOneRoute, ListRoute, RemoveRoute, UpdateRoute} from "@/routes/tasks/tasks.routes";
import { AppRouteHandler} from "@/lib/types";
import db from "@/db";
import {tasks} from "@/db/schemas";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import * as HttpStatusCodes from "stoker/http-status-codes";
import {eq} from "drizzle-orm";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasks = await db.query.tasks.findMany()
    return c.json(tasks);
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
   const task = c.req.valid('json');

    const [newTask]=await db.insert(tasks).values(task).returning();

    return c.json(newTask,HttpStatusCodes.OK);
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const  {id} = c.req.valid('param');
    const task = await db.query.tasks.findFirst({
        where(fields,operators){
            return operators.eq(fields.id,id);
        }
});
    if(!task){
        return c.json({message:HttpStatusPhrases.NOT_FOUND},HttpStatusCodes.NOT_FOUND);
    }
    return c.json(task,HttpStatusCodes.OK);
}

// UPDATE
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
    const {id} = c.req.valid('param');
    const task = c.req.valid('json');

    const [updatedTask] = await db.update(tasks).set(task).where(eq(tasks.id,id)).returning();
    if(!updatedTask){
        return c.json({message:HttpStatusPhrases.NOT_FOUND},HttpStatusCodes.NOT_FOUND);}

    return c.json(updatedTask,HttpStatusCodes.OK);
}

// DELETE
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
    const {id} = c.req.valid('param');
    const task = await db.query.tasks.findFirst({
        where(fields,operators){
            return operators.eq(fields.id,id);
        }
    });
    if(!task){
        return c.json({message:HttpStatusPhrases.NOT_FOUND},HttpStatusCodes.NOT_FOUND);
    }
await db.delete(tasks).where(eq(tasks.id,id));
    return c.body(null,HttpStatusCodes.NO_CONTENT);
}