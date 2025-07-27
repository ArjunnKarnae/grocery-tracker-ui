import type { JSX } from "react";
import { LuSettings, LuUser } from "react-icons/lu";

export const Header = ():JSX.Element => {
    return (
            <header className="sticky top-0 flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Pantry</h1>
                <div className="flex space-x-3">
                    <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <LuSettings className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <LuUser className="h-5 w-5" />
                    </button>
                </div>
            </header>
    );
}