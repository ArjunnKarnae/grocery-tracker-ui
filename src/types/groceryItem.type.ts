import {z} from "zod";
import type { GroceryItemSchema } from "../schemas/groceryItem.schema";


// Used for react-hook-form (raw input values)
export type GroceryItemFormType = z.input<typeof GroceryItemSchema>;

// Used after validation (parsed values)
export type GroceryItemParsedType = z.infer<typeof GroceryItemSchema>;