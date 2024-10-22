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
        <div className='flex flex-col mt-3 w-full'>
            {prototype(
                (<video
                    src={`${process.env.PUBLIC_URL}/images/animation.mp4`}
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