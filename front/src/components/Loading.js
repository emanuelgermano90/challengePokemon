import React from 'react';

export default function Loading({ id, name, types, abilities }) {
    // console.log('ksksks', types)
    return (

        <div className='
            absolute 
            flex justify-center items-center
            w-screen h-screen 
            bg-black bg-opacity-50
        '>

            <div>

                <div className='
                    w-20 h-20
                    border-8 border-x-orange-700 border-b-orange-700 border-t-yellow-400 rounded-full
                    animate-spin
                '></div>

                <p className='text-2xl text-white'>Loading...</p>

            </div>

        </div>

    );

};