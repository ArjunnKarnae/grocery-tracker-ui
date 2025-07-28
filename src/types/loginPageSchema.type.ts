import { loginPageSchema } from "../schemas/loginPage.schema";
import {z} from "zod";

export type LoginPageSchemaType = z.infer<typeof loginPageSchema>;