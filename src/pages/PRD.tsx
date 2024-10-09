import React from "react";
import { productRequirementDocument } from "../constants/productRequirementsDoc.ts";

export function PRD() {
    return (
        <div className="w-full flex flex-col text-left">
            {productRequirementDocument.map((section) => {
                return (
                    <>
                        <h2 className="font-h2 text-h2 my-2" >{section.name}</h2>
                        <p>{section.text}</p>
                    </>
                )
            })}
        </div>
    )
}