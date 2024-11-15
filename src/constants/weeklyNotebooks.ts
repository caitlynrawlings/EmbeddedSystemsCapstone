export type entry = {
    day: string;  // date that weekly notebook is due
    plans: string[];  // each entry in the array maps to a bullet point
    summary: string[];  // each entry in the array maps to a paragraph
    images: {fileName: string, caption: string}[];  // fileName should be just the name of the image and the image should be in ./public/media/
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
        day : "November 14th",
        plans: [
            "Get everything wired",
            "Initial prototype for case for hardware",
            "Start collecting data for ML gesture training"
        ],
        summary : [
            "We fully setup the software for collecting the data for ML gesture training.",
            "We started designing the 3D printed case for holding the microcontroller, battery, and IMU.",
        ],
        images : [], 
        individualContributions : [
            {name: "Anderson", work: "Working on designing case for the microcontroller, battery, and IMU."},
            {name: "Caitlyn", work: "Completed the code for collecting data for ML gesture training. Refining clicking code logic."},
            {name: "Zach", work: "Work on soldering the IMU and microcontroller, as well as battery component."},
            {name: "Nicholas", work: "Working on designing case for the microcontroller, battery, and IMU."},
        ],
        sources : [
        ]
    },
    {
        day : "November 8th",
        plans: [
            "Print and test 3D printed case for holding micorocontroller, battery, and IMU",
            "Work on tilt to movement settings",
            "Test glove clicking functionality",
        ],
        summary : [
            "We finished soldering the wires to conductive fabric on glove for all digits. Ironed out ideas for finger connection to correponding button functionality. Now that these are both complete we can start testing the button code we wrote with the glove.",
            "We created the content for the kickstarter-style website and published it.",
            "Brainstormed ideas for 3D printed case and started intial designs for 3D printed case."
        ],
        images : [{fileName: "wires_everywhere.jpg", caption: "Soldering wires to conductive fabric on glove for all digits."}], 
        individualContributions : [
            {name: "Anderson", work: "Soldered wires to conductive fabric on glove for all digits. Modeled the glove for the kickstarter website. Starting design for 3D printed case."},
            {name: "Caitlyn", work: "Worked on editing the ML code for our purposes. Brainstormed button functionality and started coding the 'clicking' logic."},
            {name: "Zach", work: "Testing IMU for mouse movement functionality. Tested IMU functionality with different wirings after it stopped working. Ordered new IMU."},
            {name: "Nicholas", work: "Designed and created kickstarter style website for our product. Brainstormed ideas for 3D printed case and button functionalities."},
        ],
        sources : [
        ]
    },
    {
        day : "November 1st",
        plans: [
            "Optimize tilt to movement settings",
            "Implement personalized settings",
            "Test glove clicking functionality",
        ],
        summary : [
            "We found out that the mouse library we wanted to use for controlling the mouse was not compatible with the esp32 (1). "
            + "We found an alternative library that is compatible with esp32 (2), and also a keyboard library that is compatible as well that may be useful (3).",
            "We started putting together peices of our prototype like the conductive fabric on the glove, and the microcontroller connections to the battery and IMU."
        ],
        images : [
            {fileName: "spi_wiring.png", caption: "This IMU and microcontroller connected using SPI."},
            {fileName: "spi_with_battery.png", caption: "This is the SPI connection with the battery also attached."},
            {fileName: "glove1.png", caption: "This is the glove with conductive fabric on it and wires soldered to the conductive fabric on the back side of the glove."},
        ], 
        individualContributions : [
            {name: "Anderson", work: "Worked on testing conductive fabric connections and soldering wire to conductive fabric on glove. Helped with midpoint progress presentation."},
            {name: "Caitlyn", work: "Tested mouse libraries to find one compatable with esp32. Helped test conductive fabric connections. Helped with midpoint progress presentation."},
            {name: "Zach", work: "Resoldered the esp32 to the IMU using the SPI connection. Connected the battery to the esp32 to power it. Helped with midpoint progress presentation."},
            {name: "Nicholas", work: "Worked on testing conductive fabric connections and soldering wire to conductive fabric on glove. Helped with midpoint progress presentation."},
        ],
        sources : [
            "https://www.reddit.com/r/esp32/comments/1bbzp76/mouseh_library_for_esp32/",
            "https://github.com/T-vK/ESP32-BLE-Mouse",
            "https://github.com/T-vK/ESP32-BLE-Keyboard"
        ]
    },
    {
        day : "October 24th",
        plans: [
            "Interpret readings from IMU to mouse movement",
            "Connect battery to microcontroller",
            "Determine how to send data between esp32s"
        ],
        summary : [
            "We connected the IMU to the microcontroller and read the data from it. "
            + "This involved trying multiple connections like UART-RVC, UART, and I2C to one that was able to connect to the IMU and receive the data properly. "
            + "We also finished the rapid prototypes.",
        ],
        images : [{fileName: "connected.jpg", caption: "This is the IMU and microcontroller connected."}], 
        individualContributions : [
            {name: "Anderson", work: "Helped solder the IMU to the mircrocontroller and battery."},
            {name: "Caitlyn", work: "Helped solder the IMU to the mircrocontroller."},
            {name: "Zach", work: "Helped solder the IMU to the mircrocontroller and trouble shooting different connections like UART and I2C."},
            {name: "Nicholas", work: "Helped solder the IMU to the mircrocontroller and battery."},
        ],
        sources : [
        ]
    },
    {
        day : "October 17th",
        plans: [
            "Order additional materials.",
            "Determine what format to send information between microchips.",
            "Test the IMU and figure out format of its output."
        ],
        summary : [
            "We finished the project proposal and project requirements document. This included refining out project specifications and outlining how we will split the work.",
            "We received some items that we had bought previously and determined more items that we will need to purchase."
        ],
        images : [], 
        individualContributions : [
            {name: "Anderson", work: "Worked on project proposal and project requirements documents."},
            {name: "Caitlyn", work: "Worked on project proposal and project requirements documents."},
            {name: "Zach", work: "Ordered materials and worked on project proposal and project requirements documents."},
            {name: "Nicholas", work: "Worked on project proposal and project requirements documents."},
        ],
        sources : []
    },
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