import {z, ZodError} from "zod";
import {config} from "dotenv";
import {expand} from "dotenv-expand";
import * as process from "node:process";
expand(config())
const EnvSchema = z.object({
    NODE_ENV: z.string().default("developpement"),

    LOG_LEVEL:z.enum(["fatal" , "error" , "warn" , "info" ,"debug" , "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
}).refine((input)=>{
    if(input.NODE_ENV === "production"){
        return !!input.DATABASE_AUTH_TOKEN
    }
    return true
})

export type env = z.infer<typeof EnvSchema>;

let env : env;

 try {
     env = EnvSchema.parse(process.env)
} catch (e) {
     const error = e as ZodError
      console.error("Invalid Env:");
     console.error(error.flatten().fieldErrors);
     process.exit(1)
 }

export  default env;