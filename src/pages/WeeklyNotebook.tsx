import React from "react";
import { weeklyNotebooks } from "../constants/weeklyNotebooks.ts";

export function WeeklyNotebook() {
    return (
        <>
            {weeklyNotebooks.map((week) => {return entry(week)})}
        </>
    )
}

const entry = (week) => {
    return (
        <section className="mb-3">
            <h2 className="font-h2 text-h2 my-2">{week.day}</h2>
            <div className="">
                {week.summary.map(p => {
                    return (
                        <p className="mb-2">{p}</p>
                    )
                })}
                <h3 className="font-h3 text-h3 my-2">Sources</h3>
                <ol className="">
                    {week.sources.map((s, index) => {
                        return (
                            <li>{`(${index+1}) ${s}`}</li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}