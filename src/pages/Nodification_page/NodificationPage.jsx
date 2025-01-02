import React from 'react'
import MarkAsRead from './Components/MarkAsRead'
import NotificationComponents from './Components/NotificationComponents'

const NodificationPage = () => {
    return (
        <div className='p-4'>
            <div className='bg-theme-primary text-white rounded-lg px-4 py-12 text-center font-bold text-4xl'>
                Notification
            </div>
            <NotificationComponents/>
        </div>
    )
}

export default NodificationPage