import {z, ZodError} from "zod";
import {config} from "dotenv";
import {expand} from "dotenv-expand";
import * as process from "node:process";
expand(config())
const EnvSchema = z.object({
    NODE_ENV: z.string().default("developpement"),
    PORT: z.number().default(3000),
    LOG_LEVEL:z.enum(["fatal" , "error" , "warn" , "info" ,"debug" , "trace"])
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