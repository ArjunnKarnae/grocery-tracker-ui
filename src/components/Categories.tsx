import { type JSX } from "react";

const categories = ["All", "Bakery", "Canned Goods", "Dairy", "Produce", "Pulses"];

export const Categories = ({category, handleOnClick}:{category: string, handleOnClick: (name: string) => void}): JSX.Element => {
   
    const renderedCategories = categories.map((ele, index) => {
        return <CategoryButton name={ele} isActive={category === ele} onClick={(name: string) => handleOnClick(name)} key={index} /> 
    });

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            {renderedCategories}
        </div>
    )
}

const CategoryButton = ({name, isActive, onClick}: {name: string, isActive: boolean, onClick: (name: string) => void}): JSX.Element => {
    return (
        <button className={`${isActive ? "bg-blue-400 text-white-700 hover:bg-blue-500" : "bg-gray-200 text-gray-700 hover:bg-gray-300" } cursor-pointer px-4 py-2 rounded-full  focus:outline-none`}
                data-category="bakery" onClick={() => onClick(name)}>{name}</button>
    );
}