import React from 'react';

export function RapidPrototype() {

    const prototype = (content, caption) => {
        return (
            <div className='mb-3'>
                {content}
                <p className='my-2'>{caption}</p>
            </div>
        )
    }
    return (
        <div className='flex flex-col mt-3 w-full '>
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/rightClick.jpg`}
                    className='max-h-[20rem]'
                    alt="A gloved hand touching index finger to thumb."
                />),
                "How we envision the right click user input from the glove to be performed"
            )}
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/leftClick.jpg`}
                    className='max-h-[20rem]'
                    alt="A gloved hand touching middle finger to thumb."
                />),
                "How we envision the left click user input from the glove to be performed"
            )}
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/backOfGlove.jpg`}
                    className='max-h-[20rem]'
                    alt="Sketch of the back of the Glove with wires from the finger tips connected to the microcontroller and the IMU connected to the microcontroller."
                />),
                "Back of glove"
            )}
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/frontOfGlove.jpg`}
                    className='max-h-[20rem]'
                    alt="Sketch of the front of the Glove with conductive fabric on the finger tips with wires coming from it."
                />),
                "Front of glove"
            )}
            {prototype(
                (<video
                    src={`${process.env.PUBLIC_URL}/media/animation.mp4`}
                    className='max-h-[20rem]'
                    controls
                />),
                "How we envision the mouse moving from user input."
            )}
        </div>
    )
}

// notes from ds class
/**
 * cell connects to google drive to download files
 * google dive authentification step then download files
 * they appear
 * 
 * can specify things like number of cores to use and other things 
 * init gives back spark object which is entry point to a lot of things
 * 
 * spark gives ui with task execution and environment, etc
 * 
 * can turn it into panda dataframe for seom things -> good for visualtions since all data points are distributed
 * 
 * cache method will take df that is output and save it in memory
 * 
 * if data eill fit into memory then dont use distributed thing like spark
 */