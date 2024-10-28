import React from 'react';

export function RapidPrototype() {

    const prototype = (content, caption) => {
        return (
            <div className='mb-3'>
                {content}
                <p className='mb-2'>{caption}</p>
            </div>
        )
    }

 

    return (
        <div className='flex flex-col mb-3 w-full gap-2 '>
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/9DOF_IMU.jpg`}
                    className='max-h-[20rem]'
                    alt=""
                />),
                "Labeled diagram of how things will be connected on the product."
            )}
            {prototype(
                (<img
                    src={`${process.env.PUBLIC_URL}/media/I2C_connection.png`}
                    className='max-h-[20rem]'
                    alt=""
                />),
                "I2C connection as described here: https://learn.adafruit.com/adafruit-9-dof-orientation-imu-fusion-breakout-bno085/arduino."
            )}
            <h2 className='font-h2 text-h2 my-2'>Explanation of Parts</h2>
            <p className='font-normal'>2x Ardunio Nano ESP32 Board</p>
            <ul>
                <li>- 1 board connected to computer to receive positional data</li>
                <li>- 1 board on hand to process machine learning data for gesture recognition</li>
            </ul>
            <p className='font-normal'>Adafruit BNO085 IMU Board</p>
            <ul>
                <li>- gyroscope and accelerometer</li>
                <li>- communicates with on-hand ESP via I2C                </li>
            </ul>
            <p className='font-normal'>3V Lithium Battery</p>
            <p>Lithium battery used for powering the device wirelessly. Allows for the remote and mobile feature of the mouse glove while powering the components. Power is limited to 3 volts to restrict the amount of power used for the longevity of the device, as well as the powering of the prototype is set with a low requirement of power.</p>
            <p className='font-normal'>5mm x 10m Conductive Nylon</p>
            <p>Used for the connection of components on the glove, allows for the device to interpret controls/commands given by the user. The conductive nylon would be attached to the glove where the important connections would be made on the fingertips of the glove. As of right now, the nylon would run along the backside of the glove from the IMU board (Adafruit BNO085) to the fingertips of the glove. Where the thumb of the glove would be the negative charge and all the other fingers would be the positive charge connected to different ports. Whenever a finger connects/taps to the thumb, a full circuit would be made and give the device a command. Each finger would have its own associated command.</p>
            <p className='font-normal'>32GB MicroSD card</p>
            <p>Used for the bluetooth connection between the computer and glove mousing prototype. This card would be used for the bluetooth port that would handle the communication between devices.</p>

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