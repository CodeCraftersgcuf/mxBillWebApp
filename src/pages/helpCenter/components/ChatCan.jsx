import React from 'react'
import Reciver from './Reciver'
import Sender from './Sender'

const ChatCan = () => {
  return (
    <div className='max-h-[60vh] overflow-auto 
    
    bg-gray-50 my-4 p-2'>
        <div className='flex flex-col gap-4'>
            <Reciver />
            <Sender />
            <Reciver />
            <Sender />
        </div>
    </div>
  )
}

export default ChatCan
