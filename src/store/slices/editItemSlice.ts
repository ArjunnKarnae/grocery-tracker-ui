import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GroceryItem } from "../../models/GroceryItem";


interface EditItemState {
    groceryItemToEdit: GroceryItem | undefined;
}

const initialState: EditItemState = {
    groceryItemToEdit: undefined
}

export const editItemSlice = createSlice({
    name: 'GroceryEditItem',
    initialState: initialState,
    reducers: {
        setGroceryItemToEdit: (state, action: PayloadAction<GroceryItem>) => {
            state.groceryItemToEdit = action.payload;
        },
        clearGroceryItemToEdit: (state) => {
            state.groceryItemToEdit = undefined;
        }
    }
})

export const { setGroceryItemToEdit, clearGroceryItemToEdit } = editItemSlice.actions;
export const editItemReducer = editItemSlice.reducer;