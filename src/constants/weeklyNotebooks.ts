export type entry = {
    day: string;  // date that weekly notebook is due
    plans: string[];  // each entry in the array maps to a bullet point
    summary: string[];  // each entry in the array maps to a paragraph
    images: {fileName: string, caption: string}[];  // fileName should be just the name of the image and the image should be in ./public/images/
    individualContributions : {name: string, work: string}[],
    sources : string[]  // empty if none
}

///////////////////////////////////////////
// Blank notebook entry
///////////////////////////////////////////
// {
//     day : "",
//     plans: [
//         ""
//     ],
//     summary : [
//         ""
//     ],
//     images : [], 
//     individualContributions : [
//         {name: "Anderson", work: ""},
//         {name: "Caitlyn", work: ""},
//         {name: "Zach", work: ""},
//         {name: "Nicholas", work: ""},
//     ],
//     sources : [
//     ]
// },

export const weeklyNotebooks : entry[] = [
    {
        day : "October 11th",
        plans: [
            "Determine what project we want to make.",
            "Start brainstorming implementation ideas."
        ],
        summary : [
            "We pitched our initial ideas on Tuesday. These ideas consisted of a computer mouse in a glove, a holiday-themed image-displaying necklace, a local UV-level detector, "
            + "a health-monitoring watch. After discussing, we settled on the idea of the computer mouse in a glove.",
            "So far, we have brainstormed what the functions of the mouse would be and have decided necessities are right click, left click, and moving the mouse."
            + " We have looked into ways we could implement these functions including using conductive fabric for completing a circuit between thumb and two other fingers for the clicks,"
            + " as well as researching an accelerometer and gyroscope sensor (1)(2) we could use for converting hand movement to mouse movement. "
            + "Additionally we have looked into previous solutions (3) to this problem to get ideas and also see what we could try to improve.",
            "We also determined that Zach would be in charge of buying components."

        ],
        images : [{fileName: "prevImplementation.webp", caption: "This is an example of a previous solution is the mouse glove problem (4)."}], 
        individualContributions : [
            {name: "Anderson", work: "Came up with the project pitch of a health-monitoring watch and helped brainstorm."}, 
            {name: "Caitlyn", work: "Came up with the project pitch of a image-displaying necklace and helped brainstorm."}, 
            {name: "Zach", work: "Came up with the project pitch of a glove mouse, helped brainstorm, and volunteered to be in charge or ordering components."}, 
            {name: "Nicholas", work: "Came up with the project pitch of a local UV-level detector and helped brainstorm."}
        ],
        sources : [
            "https://www.adafruit.com/product/3886",
            "https://www.adafruit.com/product/4754",
            "https://www.youtube.com/watch?v=1MaKGCPNSJA",
            "https://www.instructables.com/Wireless-Mouse-Glove-1/"
        ]
    },

]