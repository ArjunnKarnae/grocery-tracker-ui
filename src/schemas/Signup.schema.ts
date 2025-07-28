import {z} from "zod";

export const SignupSchema = z.object({
    firstName: z.string().nonempty({message: "Please Enter First Name"}).min(5, {message: "FirstName should be atleast 5 Characters"}),
    lastName: z.string().nonempty({message: "Please Enter Last Name"}).min(3, {message: "LastName should be atleast 3 Characters"}),
    email: z.email().nonempty({message: "Please Enter Email"}),
    userName: z.string().nonempty({message: "Please Enter User Name"}).min(5, {message: "UserName should be atleast 5 Characters"}),
    password: z.string().nonempty({message: "Please Enter Password"}).min(8, {message: "Password should be atleast 8 Characters"}),
    confirmPassword: z.string().nonempty({message: "Please Enter Confirm Password"}).min(8, {message: "Confirm Password should be atleast 8 Characters"})
}).refine((data) => 
    (data.password === data.confirmPassword), {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
)