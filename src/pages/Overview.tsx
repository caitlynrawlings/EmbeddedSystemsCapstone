import React from "react";

export function Overview() {
    return (
        <main className="w-full">
            <p className="text-center mb-6 text-xl border-b pb-6 w-full">Anderson Lu, Caitlyn Rawlings, Zach Wittgens, Nicholas Wolff</p>
            <div className="w-full flex flex-col gap-2 text-left items-start">
                <p>This is our project website for the <a className="underline text-blue-800 hover:text-blue-600" href="https://courses.cs.washington.edu/courses/cse475/">University of Washington's CSE/ECE 475 course</a>.</p>
                <p>Our project is a Glove Mouse. The Glove Mouse is a device wearable as a glove that allows users to control a computer’s cursor through hand movements.</p>
            </div>
        </main>
    )
}