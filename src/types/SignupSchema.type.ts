import { SignupSchema } from "../schemas/Signup.schema";
import {z} from "zod";

export type SignupSchemaType = z.infer<typeof SignupSchema>;