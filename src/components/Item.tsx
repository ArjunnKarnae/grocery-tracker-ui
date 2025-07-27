import { useEffect, useRef, useState, type JSX } from "react"
import { FaMinus, FaRegTrashCan } from "react-icons/fa6"
import { MdModeEditOutline } from "react-icons/md"
import type { GroceryItem } from "../models/GroceryItem"
import { useDeleteGroceryItemMutation, useUpdateGroceryItemMutation } from "../store/apis/groceryItemsApi"
import { IoMdAlert } from "react-icons/io"
import { getBackgroundColorClass, getExpirationStatusText } from "../utils/groceryHelpers"
import { CiMenuKebab } from "react-icons/ci"
import { useGroceryTrackingcontext } from "../hooks/useGroceryTrackingContext"
import { useDispatch } from "react-redux"
import { setGroceryItemToEdit } from "../store/slices/editItemSlice"
import { ImSpinner10 } from "react-icons/im"


export const Item = ({groceryItem}: {groceryItem: GroceryItem}):JSX.Element => {
    const { toggleAddEditItem } = useGroceryTrackingcontext();
    const [deleteGroceryItem, results] = useDeleteGroceryItemMutation();
    const [updateGroceryItem, updateResults] = useUpdateGroceryItemMutation();
    const [isKebabMenuOpen, setIsKebabMenuOpen] = useState(false);
    const kebabMenuRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();

    const toggleKebabMenu = () => {
        setIsKebabMenuOpen((prev) => !(prev));
    }
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
           if(kebabMenuRef.current && e.target instanceof Node){
                if(!kebabMenuRef.current.contains(e.target)){
                    setIsKebabMenuOpen(false);
                }
           }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [kebabMenuRef]);

    const handleDeleteGroceryItem = () =>{
        if(isKebabMenuOpen) {
            toggleKebabMenu();
        }
        deleteGroceryItem(groceryItem.id!);
    }

    const handleEditGroceryitem = () => {
         if(isKebabMenuOpen) {
            toggleKebabMenu();
        }
        dispatch(setGroceryItemToEdit(groceryItem));
        toggleAddEditItem();
    }

    const handleMarkUsed =() => {
        if(isKebabMenuOpen) {
            toggleKebabMenu();
        }
        if(groceryItem.quantity === 1){
            deleteGroceryItem(groceryItem.id!);
        }else{
            updateGroceryItem({...groceryItem, quantity: groceryItem.quantity - 1});
        }
    }

    return (
        <> {results.error && <div className="flex items-center"><IoMdAlert className="h-5 w-5" fill="red"/><span className="ml-2 font-bold text-red-500 text-md">Error Deleting the selected Grocery Item</span></div>}
        <div className={`${getBackgroundColorClass(groceryItem)} flex items-center justify-between border rounded-lg p-3 shadow-sm`}>
            <div className="flex-grow text-left">
                <h3 className="font-semibold text-gray-800 text-lg">{groceryItem.name}</h3>
                <p className="text-sm text-gray-600">
                    {updateResults.isLoading ?  <ImSpinner10 className="h-3 w-3" /> : `${groceryItem.quantity} ${groceryItem.unit}`} 
                    {groceryItem.expirationDate && 
                    <span className="text-yellow-700 font-medium ml-2">{getExpirationStatusText(groceryItem.expirationDate)}</span>}
                </p>
            </div>
            <div className="flex items-center space-x-2 hidden sm:block">
                <button onClick={handleEditGroceryitem} className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none cursor-pointer">
                    <MdModeEditOutline className="h-5 w-5" />
                </button>
                <button onClick={handleDeleteGroceryItem} className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none cursor-pointer">
                    <FaRegTrashCan className="h-5 w-5"/>
                </button>
                <button onClick={handleMarkUsed} className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:outline-none cursor-pointer">
                    <FaMinus className="h-5 w-5" />
                </button>
            </div>
            <div className="relative sm:hidden" ref={kebabMenuRef}>
                <button onClick={toggleKebabMenu} className="kebab-menu-button p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none">
                    <CiMenuKebab />
                </button>
                {isKebabMenuOpen && 
                    <div className="kebab-dropdown-menu absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg py-1 z-10">
                        <button onClick={handleEditGroceryitem} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</button>
                        <button onClick={handleDeleteGroceryItem} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</button>
                        <button onClick={handleMarkUsed} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Mark Used</button>
                    </div>
                }
            </div>
        </div>
        </>
    )
}