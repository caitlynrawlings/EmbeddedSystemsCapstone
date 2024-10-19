import React from "react";
import { productRequirementDocument } from "../../constants/productRequirementsDoc.ts";

export function PRD() {

    const paragraphFormatting = (paragraphs: string[]) => {
        return (
            paragraphs.map((p, index) => {
                return (
                    <p key={index} className="mb-2">{p}</p>
                )
            })
        )
    }

    const listFormatting = (bullets: string[]) => {
        return (
            <ul className="ml-3">
                {bullets.map((plan, index) => {
                    return (
                        <div className="flex flex-row gap-2 items-center">
                            <div className="h-1 w-1 bg-black rounded-full" />
                            <li key={index}>{plan}</li>
                        </div>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="w-full flex flex-col text-left">
            {productRequirementDocument.map((section) => {
                return (
                    <>
                        <h2 className="font-h2 text-h2 my-2" >{section.name}</h2>
                        {section.format === "bullets" ? listFormatting(section.text) : paragraphFormatting(section.text)}
                    </>
                )
            })}
        </div>
    )
}
