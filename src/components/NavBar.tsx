import React from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { sections } from "../constants/sections.ts";

export function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("location: "+location.pathname)
    const urlRoute = location.pathname.slice(1)
    const currentSection = urlRoute === "" ? "overview" : urlRoute
    console.log("route: "+currentSection)

    const navBarButton = (name:string) => {
        return (
            <button 
                key={name}
                onClick={() => navigate(name === "Overview" ? '/' : `/${encodeURIComponent(name.toLowerCase().replace(/\s/g, ''))}`)}
                className={`justify-center items-center flex w-full`}
            >
                <p className={`${currentSection.trim() === name.toLowerCase().replace(/\s/g, '') ? "font-bold" : "font-thin"} text-sm text-left px-2 text-blue-50`}>{name}</p>
            </button>
        )
    }

    return (
        <nav className="flex flex-row w-full bg-blue-950 gap-5 py-4 px-6 border-b border-slate-300 text-nowrap">
            <p className={`text-left text-blue-50 font-thin mr-8 text-xl`}>UW CSE/ECE 475</p>
            {sections.map((section) => {
                return (
                    navBarButton(section)
                )
            })}
        </nav>
    )
}