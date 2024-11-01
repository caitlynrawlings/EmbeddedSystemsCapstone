import React from "react";
import { assignments } from "../constants/assignments.ts";
import { useNavigate  } from "react-router-dom";

export function Assignments() {
    const navigate = useNavigate();

    const assignmentComponent = (assignment) => {
        return (
            <div>
                <div className="flex flex-row items-end my-1 gap-4">
                    <h2 className="font-h2 text-h2 text-nowrap">
                        <button 
                            onClick={() => assignment.link ? window.open(assignment.link) : navigate(`/assignments/${encodeURIComponent(assignment.name.toLowerCase().replace(/\s/g, ''))}`)}
                            className="underline text-blue-800 hover:text-blue-600" 
                        >
                            {assignment.name}
                        </button>
                    </h2>
                </div>
                <p className="mb-2">{assignment.description}</p>

                <div className={`${assignment === assignments[assignments.length - 1] ? "hidden" : "border-l border-slate-300 ml-2 h-12"}`}></div>
            </div>
        )
    }

    return (
        <div className="w-full mb-10">
            {assignments.map((assignment) => {
                return assignmentComponent(assignment)
            })}
        </div>
    )
}