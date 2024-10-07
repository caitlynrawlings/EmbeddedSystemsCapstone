import React, { useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { sections } from "../constants/sections.ts";

export function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, editIsOpen] = useState<boolean>(false);

    const urlRoute = location.pathname.slice(1)
    const currentSection = urlRoute === "" ? "overview" : urlRoute

    const navBarButton = (name:string) => {
        return (
            <button 
                key={name}
                onClick={() => { editIsOpen(false); navigate(name === "Overview" ? '/' : `/${encodeURIComponent(name.toLowerCase().replace(/\s/g, ''))}`)}}
                className={`items-center flex w-full md:w-auto`}
            >
                <p className={`${currentSection.trim() === name.toLowerCase().replace(/\s/g, '') ? "font-bold" : "font-thin"} md:text-sm text-lg text-left px-2 text-blue-50`}>{name}</p>
            </button>
        )
    }

    const openMenuButton = () => {
        return (
            <button 
                aria-label="menu"
                onClick={() => editIsOpen(!isOpen)}
                className={`h-10 w-10 justify-center items-center rounded-md flex-col gap-1.5 flex`}
            >
                <div className={`w-8 bg-blue-50 h-1 rounded-xs`}/>
                <div className={`w-8 bg-blue-50 h-1 rounded-xs`}/>
                <div className={`w-8 bg-blue-50 h-1 rounded-xs`}/>
            </button>
        )
    }

    return (
        <>
            {/* for medium size screens */}
            <nav 
                className={`bg-blue-950 h-16 px-6 border-slate-300 text-nowrap 
                    md:flex flex-row w-full border-b hidden`}
            >
                <button onClick={() => navigate("/")} className={`text-left text-blue-50 font-thin mr-8 text-2xl`}>UW CSE/ECE 475</button>
                <div className={`flex flex-row ml-auto gap-3`}>
                    {sections.map((section) => navBarButton(section))}
                </div>
            </nav>


            {/* for small screens */}
            <header className={`md:hidden h-16 px-4 bg-blue-950 border-slate-300 border-b`}>
                <div className=" flex flex-row h-full items-center gap-4">
                    {openMenuButton()}
                    <button onClick={() => navigate("/")} className={`text-lef text-blue-50 font-thin text-2xl`}>UW CSE/ECE 475</button>
                </div>
            </header>
            
            <div className={`w-full h-full bg-opacity-50 bg-slate-400 fixed md:hidden ${!isOpen && "hidden"}`}>
                <nav 
                    className={`bg-blue-950 py-4 pl-3 pr-16 text-nowrap fixed
                        md:hidden flex-col h-full ${isOpen ? "flex" : "hidden"}`}
                >
                    <div className={`flex flex-col gap-3 `}>
                        <button 
                            aria-label="close menu" 
                            className="h-10 w-10 block mb-1"
                            onClick={() => editIsOpen(false)}
                        >
                            <div className="bg-blue-50 h-0.5 w-6 rotate-45 mt-0 absolute rounded-sm"/>
                            <div className="bg-blue-50 h-0.5 w-6 rotate-135 mt-0 absolute rounded-sm"/>
                        </button>
                        {sections.map((section) => navBarButton(section))}
                    </div>
                </nav>

            </div>

        </>
    )
}