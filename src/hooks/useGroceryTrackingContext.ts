import { useContext } from "react"
import { GroceryTrackingContext, type GroceryTrackingContextType } from "../context/GroceryTrackingContext"

export const useGroceryTrackingcontext = (): GroceryTrackingContextType => {
    const context = useContext(GroceryTrackingContext);
    if(!context){
        throw new Error("Grocery Tracking Context is undefined");
    }
    return context;
}