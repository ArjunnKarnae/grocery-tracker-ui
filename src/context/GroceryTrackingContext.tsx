import { createContext, useState } from "react";

export interface GroceryTrackingContextType {
    addEditItem: boolean;
    toggleAddEditItem: () => void;
    editEnabled: boolean;
    toggleEditEnabled: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const GroceryTrackingContext = createContext<GroceryTrackingContextType | undefined>(undefined);

export const GroceryTrackingProvider = ({children}: {children: React.ReactNode}) => {
    const [addEditItem, setAddEditItem] = useState(false);
    const [editEnabled, setEditEnabled] = useState(false);
    
    const toggleAddEditItem = () => {
        setAddEditItem(!addEditItem);
    }
    const toggleEditEnabled = () =>{
        setEditEnabled((prev) => !prev);
    }

    const value = {addEditItem, toggleAddEditItem, editEnabled, toggleEditEnabled}

    return (
        <GroceryTrackingContext.Provider value={value}>
            {children}
        </GroceryTrackingContext.Provider> 
    );

};