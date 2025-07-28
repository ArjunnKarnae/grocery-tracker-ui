import { useEffect, useRef, useState, type JSX } from "react";
import { LuSettings, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router";

export const Header = ():JSX.Element => {
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
    const logoutRef = useRef<HTMLDivElement | null>(null);

    useEffect(() =>{
        const handleClickOutside = (e: MouseEvent) => {
            if(logoutRef.current && e.target instanceof Node){
                if(!logoutRef.current.contains(e.target)){
                    setShowLogout(false);
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [logoutRef])

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
            <header className="sticky top-0 flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Pantry</h1>
                <div className="flex space-x-3" ref={logoutRef}>
                    <button className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <LuSettings className="h-5 w-5" />
                    </button>
                    <button onClick={() => setShowLogout(!showLogout)} className="text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer">
                        <LuUser className="h-5 w-5" />
                    </button>
                    {showLogout && 
                        <div className="absolute right-0 mt-5 w-28 bg-white rounded-md shadow-lg py-1 z-10">
                           <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</button>
                        </div>
                    }
                </div>
            </header>
    );
}