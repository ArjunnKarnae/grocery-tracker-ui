import {z} from "zod";

export const GroceryItemSchema = z.object({
   name: z.string()
            .nonempty({ message: "Name is required" })
            .min(3, { message: "Name should be at least 3 characters" }),
   quantity: z.number().min(1, {message: "Quantity must be atleast 1"}),
   category: z.string().min(1, {message: "Please select a Category"}),
   unit: z.string().min(1, {message: "Please select a Unit"}),
   expirationDate: z.date().optional()
});

