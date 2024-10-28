import {logger} from "hono-pino";
import pino from "pino";
import  pretty from 'pino-pretty'
import * as crypto from "node:crypto";
import * as process from "node:process";

export  function pinoLogger() {
    return logger({
        pino : pino({
            level: process.env.LOG_LEVEL || "info"
        },process.env.NODE_ENV==="production"? pretty(): undefined),
        http:{
            reqId:()=> crypto.randomUUID(),
        }
    })
}