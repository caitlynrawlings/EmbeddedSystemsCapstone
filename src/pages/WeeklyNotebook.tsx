import React from "react";
import { entry, weeklyNotebooks } from "../constants/weeklyNotebooks.ts";

export function WeeklyNotebook() {
    return (
        <>
            {weeklyNotebooks.map((week) => {return EntryLayout(week)})}
        </>
    )
}

const EntryLayout = (week: entry) => {
    return (
        <section className="mb-3">
            <h2 className="font-h2 text-h2 my-2">{week.day}</h2>

            <div className="">
                <h3 className="font-h3 text-h3 mb-2 mt-3">Plans</h3>
                <ul className="ml-3">
                    {week.plans.map((plan, index) => {
                        return (
                            <div className="flex flex-row gap-2 items-center">
                                <div className="h-1 w-1 bg-black rounded-full" />
                                <li key={index}>{plan}</li>
                            </div>
                        )
                    })}
                </ul>

                <h3 className="font-h3 text-h3 mb-2 mt-3">Summary</h3>
                {week.summary.map(p => {
                    return (
                        <p className="mb-2">{p}</p>
                    )
                })}

                <div className={`${week.images.length ? "block" : "hidden"} w-full`}>
                    <h3 className="font-h3 text-h3 mb-2 mt-3">Images</h3>
                    {week.images.map((image, index) => {
                        return (
                            <div className="mb-2 w-full" key={index}>
                                <img className="h-80" alt={image.caption} src={`${process.env.PUBLIC_URL}/images/${image.fileName}`}/>
                                <p className="w-full text-wrap text-sm">{image.caption}</p>
                            </div>
                        )
                    })}
                </div>

                <h3 className="font-h3 text-h3 mb-2 mt-3">Individual Contributions</h3>
                {week.individualContributions.map((person) => {
                    return (
                        <p key={person.name} className="mb-1">
                            <span className="font-normal">{person.name}:{" "}</span>
                            {person.work}
                        </p>
                    )
                })}

                <div className={`${week.sources.length ? "block" : "hidden"} w-full`}>
                    <h3 className="font-h3 text-h3 mb-2 mt-3">Sources</h3>
                    <ol className="">
                        {week.sources.map((s, index) => {
                            return (
                                <li>{`(${index+1}) ${s}`}</li>
                            )
                        })}
                    </ol>
                </div>

            </div>
        </section>
    )
}