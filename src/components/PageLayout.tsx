import React from "react"

export function PageLayout({title, content}) {
    return (
        <main className="flex flex-col min-w-[80vw] items-center md:px-8 lg:px-20 xl:px-28">
            <h1 className="font-h1 text-h1 mb-3 text-center">{title}</h1>
            {content}
        </main>
    )
}