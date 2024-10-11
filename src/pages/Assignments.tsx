import React from "react";
import { assignments } from "../constants/assignments.ts";

export function Assignments() {

    const assignmentComponent = (assignment) => {
        return (
            <div>
                <div className="flex flex-row items-end my-1 gap-4">
                    <h2 className="font-h2 text-h2 text-nowrap">
                        <a 
                            href={`/${encodeURIComponent(assignment.name.toLowerCase().replace(/\s/g, ''))}`}
                            className="underline text-blue-800 hover:text-blue-600" 
                        >
                            {assignment.name}
                        </a>
                    </h2>
                </div>
                <p className="mb-2">{assignment.description}</p>

                <div className={`${assignment === assignments[assignments.length - 1] ? "hidden" : "border-l border-slate-900 ml-2 h-12"}`}></div>
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