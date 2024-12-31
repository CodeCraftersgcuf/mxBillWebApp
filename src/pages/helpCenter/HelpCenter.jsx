import React from 'react'
import ChatCan from './components/ChatCan'
import SenderInput from './components/SenderInput'

const HelpCenter = () => {
    return (
        <div className='p-4 bg-gray-100'>
            <div className='bg-white rounded-lg shadow-lg p-8 w-full relative'>
                <h1 className='text-center text-white font-bold bg-theme-primary  p-4 rounded w-fit mx-auto'>
                    Customer Service
                </h1>
                <ChatCan />
                <SenderInput/>

            </div>

        </div>
    )
}

export default HelpCenter
