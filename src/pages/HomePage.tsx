import { useState, type JSX } from "react";
import { Header } from "../components/Header";
import { Item } from "../components/Item";
import { Categories } from "../components/Categories";
import { useFetchGroceryItemsQuery } from "../store/apis/groceryItemsApi";
import type { GroceryItem } from "../models/GroceryItem";

export const HomePage = (): JSX.Element => {
    const {isLoading, data, isError} = useFetchGroceryItemsQuery();
    const [category, setCategory] = useState<string>('All');
    const [searchText, setSearchText] = useState('');
    
    let content: JSX.Element[] | undefined = undefined;
      
    
    if(isLoading){
        return <div>Loading Items...</div>
    }else if(isError){
        return <div>Error Loading Items...</div>
    }else{
        let filteredData: GroceryItem[] | undefined = undefined;
        if(searchText === ''){
            filteredData = category.toLowerCase() === 'all'? data : data?.filter(gItem => gItem.category.toLowerCase() === category.toLowerCase());
        }else{
            filteredData = searchText === ''? data : data?.filter(gItem => gItem.name.toLowerCase().includes(searchText.toLowerCase()));
        }
        content = filteredData?.map((groceryItem: GroceryItem) => {
            return <Item groceryItem={groceryItem} key={groceryItem.id}/>
        });
    }

    const handleSearch = (val: string) => {
        setSearchText(val);
    }

    return (
         <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mb-8">
            <Header />
            <div className="mb-4">
                <input value={searchText} onChange={(event) => handleSearch(event.target.value)} type="text" placeholder="Search pantry items..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <Categories category={category} handleOnClick={(selectedCategory: string) => setCategory(selectedCategory)} />
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2">
                {content}
            </div>
        </div>
    )
}