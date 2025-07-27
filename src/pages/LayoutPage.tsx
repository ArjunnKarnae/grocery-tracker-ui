
import { HomePage } from "./HomePage";
import { FaPlus } from "react-icons/fa6";
import { GroceryItemPage } from "./GroceryItemPage";
import { useGroceryTrackingcontext } from "../hooks/useGroceryTrackingContext";
import type { JSX } from "react";


export const LayoutPage = ():JSX.Element => {
   const { addEditItem, toggleAddEditItem } = useGroceryTrackingcontext();

    return (
        <div className="min-h-screen flex flex-col items-center  sm:px-6 lg:px-8">
            { !addEditItem ? 
                <>
                <HomePage /> 
                <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => toggleAddEditItem()}>
                    <FaPlus className="h-5 w-5 sm:h-8 sm:w-8"/>
                </button>
                </>
             : <GroceryItemPage /> 
            }
            
        </div>
    )
}