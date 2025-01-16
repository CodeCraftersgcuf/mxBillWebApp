import React from 'react'
import MarkAsRead from './Components/MarkAsRead'
import NotificationComponents from './Components/NotificationComponents'

const NodificationPage = () => {
    return (
        <div className='p-0 md:p-4'>
            <div className='bg-theme-primary text-white rounded-none md:rounded-lg px-4 py-6 md:py-12 text-center font-bold text-lg md:text-2xl  lg:text-4xl'>
                Notification
            </div>
            <NotificationComponents/>
        </div>
    )
}

export default NodificationPage