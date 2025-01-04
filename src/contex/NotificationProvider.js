import React, { createContext } from 'react'

const NotificationContext = createContext()


export default function NotificationProvider({ children }) {


    const updateNotiifcation = () => {

    }

    return (

        <NotificationContext.Provider>

            {children}
            <div className="fixed left-1/2 -translate-x-1/2 top-24">
                <div className="bounce shadow-md shadow-gray-400 bg-red-400 rounded" >
                    <p className="text-white px-4 py-2 font-semibold"></p>
                    Something went wrong

                </div>


            </div>


        </NotificationContext.Provider >
    )
}
