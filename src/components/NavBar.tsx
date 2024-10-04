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
                className={`items-center flex w-full`}
            >
                <p className={`${currentSection.trim() === name.toLowerCase().replace(/\s/g, '') ? "font-bold" : "font-thin"} text-sm text-left px-2 text-blue-50`}>{name}</p>
            </button>
        )
    }

    return (
        <nav className="flex flex-row w-full bg-blue-950 py-4 px-6 border-b border-slate-300 text-nowrap">
            <button onClick={() => navigate("/")} className={`text-left text-blue-50 font-thin mr-8 text-xl`}>UW CSE/ECE 475</button>
            <div className="flex flex-row ml-auto gap-5">
                {sections.map((section) => navBarButton(section))}
            </div>
        </nav>
    )
}