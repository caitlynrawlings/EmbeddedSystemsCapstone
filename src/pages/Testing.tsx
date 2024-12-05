import React from "react";

export function Testing() {
    
function pictureBox(image) {
    return (
        <div className="h-[20rem] ">
            {image}
        </div>
    )
}
    return (
        <div className={"flex flex-col gap-2 mb-[20rem]"}>
            <div className="flex flex-row gap-2">
                {pictureBox(<img className="h-full w-auto object-contain" src={`${process.env.PUBLIC_URL}/media/ml1.png`} alt="" />)}
                {pictureBox(<img className="h-full w-auto object-contain" src={`${process.env.PUBLIC_URL}/media/ml2.png`} alt="" />)}
            </div>
            <p className="mb-10">These are iterations of the ML models accuracy. We were able to improve it by changing the type of data being collected and by making the gestures simplier.</p> 

            <div className="flex flex-row gap-2">
                {pictureBox(<img className="h-full w-auto object-contain"  src={`${process.env.PUBLIC_URL}/media/fittsLawTouchpad.png`} alt="" />)}
                {pictureBox(<img className="h-full w-auto object-contain" src={`${process.env.PUBLIC_URL}/media/fittsLawGlove.png`} alt="" />)}
            </div>
            <p> These tables compare the accuracy our glove to a touchpad using a Fitts law test.</p>

        


        </div>
    )

    
}