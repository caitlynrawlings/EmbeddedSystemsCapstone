import React from "react"

export function PageLayout({title, content}) {
    return (
        <main className="flex flex-col w-full items-center md:px-8 lg:px-20 xl:px-28">
            <h1 className="font-h1 pt-16 text-h1 my-4 text-center">{title}</h1>
            {content}
        </main>
    )
}