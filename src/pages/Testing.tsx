import React from "react";

export function Testing() {
    
function pictureBox(image) {
    return (
        <div className="h-[40rem] w-full">
            {image}
        </div>
    )
}
    return (
        <div className={"flex flex-col gap-2 mb-[20rem]"}>

            {pictureBox(<img className="h-full w-auto object-contain" src={`${process.env.PUBLIC_URL}/media/Figure_1.png`} alt="" />)}
            <p className="mb-2">This is the accuaracy matrix of the model we trained on gesture data.</p> 

            <div className="flex flex-row gap-2">
                {pictureBox(<img className="h-full w-auto object-contain"  src={`${process.env.PUBLIC_URL}/media/fittsLawTouchpad.png`} alt="" />)}
                {pictureBox(<img className="h-full w-auto object-contain" src={`${process.env.PUBLIC_URL}/media/fittsLawGlove.png`} alt="" />)}
            </div>
            These tables compare the accuracy our glove to a touchpad using a Fitts law test.
        </div>
    )

    
}