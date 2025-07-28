import {z} from "zod";

export const loginPageSchema = z.object({
    userName: z.string().nonempty({message: "Please Enter User Name"}),
    password: z.string().nonempty({message: "Please Enter Password"})
});

