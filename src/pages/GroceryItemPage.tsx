import { useEffect, type JSX } from "react";
import { useGroceryTrackingcontext } from "../hooks/useGroceryTrackingContext";
import { useAddGroceryItemMutation, useUpdateGroceryItemMutation } from "../store/apis/groceryItemsApi";
import type { GroceryItem } from "../models/GroceryItem";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { GroceryItemParsedType } from "../types/groceryItem.type";
import { GroceryItemSchema } from "../schemas/groceryItem.schema";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { clearGroceryItemToEdit } from "../store/slices/editItemSlice";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const unitOptions = [
  "boxes",
  "bottles",
  "bag",
  "cans",
  "grams",
  "kgs",
  "liters",
  "ml",
  "pcs",
  "packet",
];

const defaultGroceryItem: GroceryItem = {
    name: "",
    quantity: 0,
    category: "",
    unit: "",
    expirationDate: undefined
}

export const GroceryItemPage = ():JSX.Element => {
    const groceryItemToEdit = useSelector((state: RootState) => {
        return state.editGroceryItem.groceryItemToEdit;
    });
    const dispatch:AppDispatch = useDispatch();
    const {control, register, formState: {errors, isSubmitting}, handleSubmit, reset} 
            = useForm<GroceryItemParsedType>({resolver: zodResolver(GroceryItemSchema), defaultValues: {...defaultGroceryItem}});
    const {toggleAddEditItem} = useGroceryTrackingcontext();
    const [addGroceryItem, results] = useAddGroceryItemMutation();
    const [updateGroceryItem] = useUpdateGroceryItemMutation();
    
    useEffect(() => {
            if(groceryItemToEdit){
                reset({
                    name: groceryItemToEdit?.name,
                    quantity: groceryItemToEdit?.quantity,
                    category: groceryItemToEdit?.category,
                    unit: groceryItemToEdit?.unit,
                    expirationDate: groceryItemToEdit.expirationDate ? new Date(groceryItemToEdit.expirationDate): undefined
                    })
                    
            }
        }, [groceryItemToEdit, reset]);

    if(results.isLoading){
        return <div>Adding the New Item</div>
    }
    
    const onsubmit = (data: GroceryItemParsedType) => {
       
        const newItem: GroceryItem = {
            name: data.name,
            quantity: data.quantity,
            unit: data.unit,
            category: data.category || '',
            expirationDate: data.expirationDate || undefined
        }
        if(groceryItemToEdit){
            updateGroceryItem({...newItem, id: groceryItemToEdit?.id});
        }else{
            addGroceryItem(newItem);
        }
        toggleAddEditItem();
        reset();
    }

    const handleCancelButtonClick = () => {
        dispatch(clearGroceryItemToEdit());
        toggleAddEditItem();
    }

    const capitalize = (str: string) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
       <div id="addEditScreen" className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{!groceryItemToEdit ? "Add Item" : "Edit Item"}</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            <div>
                <label htmlFor="itemName" className="block text-sm text-left font-medium text-gray-700 mb-1">Name:</label>
                <input type="text" {...register("name")} id="itemName" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Rice, Chicken, Apples" />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>
        
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label htmlFor="itemQuantity" className="block text-sm text-left font-medium text-gray-700 mb-1">Quantity:</label>
                    <input type="number" {...register("quantity", 
                                                        { 
                                                            setValueAs: ((value) => (value === '' || undefined) ? 0 : parseInt(value))
                                                        })   
                                        } id="itemQuantity" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
                </div>
                 
                <div className="w-1/2">
                    <label htmlFor="itemUnit" className="block text-sm text-left font-medium text-gray-700 mb-1">Unit:</label>
                    <select id="itemUnit" {...register("unit")} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a Unit...</option>
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                        {capitalize(unit)}
                        </option>
                    ))}
                    </select>
                    {errors.unit && <p className="text-red-600 text-sm mt-1">{errors.unit.message}</p>}
                </div>
            </div>
            
            <div>
                 <label htmlFor="itemCategory" className="block text-sm text-left font-medium text-gray-700 mb-1">Category:</label>
                 <select id="itemCategory" {...register("category")} 
                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a Category...</option>
                        <option value="dairy">Dairy</option>
                        <option value="produce">Produce</option>
                        <option value="pulses">Pulses</option>
                        <option value="canned">Canned Goods</option>
                        <option value="bakery">Bakery</option>
                    </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="itemExpirationDate" className="w-full text-sm text-left font-medium text-gray-700 mb-1">Expiration Date (Optional):</label>
                {/*<input type="date" {...register("expirationDate", {valueAsDate: true})} id="itemExpirationDate" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split("T")[0]} /> */}
                <Controller name="expirationDate" control={control} render={({field}) => {
                    return <DatePicker id="itemExpirationDate" selected={field.value} onChange={(date) => field.onChange(date)} dateFormat="yyyy/MM/dd" 
                                        minDate={new Date()} 
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>;
                }}/>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" 
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer" 
                    onClick={handleCancelButtonClick}>Cancel</button>
                <button type="submit" 
                    className={` ${isSubmitting ? "disabled" : ""} px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer`}>
                    {groceryItemToEdit ? "Save Item" : "Add Item"}</button>
            </div>
        </form>
    </div> 
    );
}