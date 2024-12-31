import React from 'react'

const Overlay = ({content ='coming soon'}) => {
  return (
    <div className='w-full z-50 h-full bg-black bg-opacity-50 absolute top-0 left-0 flex items-center justify-center'>
      <h1 className='text-white md:text-4xl capitalize font-bold'>{content}</h1>
    </div>
  )
}

export default Overlay
