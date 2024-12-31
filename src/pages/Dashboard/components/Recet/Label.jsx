import React from 'react'

const Label = ({heading = 'N/A',subheading = 'N/A',amount = 'N/A',date = 'N/A'}) => {
  return (
    <div className='flex items-center  rounded-lg shadow-lg shadow-gray-500 p-2 gap-4'>
        <div className='icon-can bg-theme-primary text-white w-16 h-16 p-4 flex items-center justify-center rounded-full'>
            <i className='bx bx-phone text-4xl'></i>
        </div>
        <div className='flex flex-col w-full'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-xl capitalize'>{heading}</h1>
                <h1 className='font-bold text-xl'>₦ {amount}</h1>
            </div>
            <div className='flex items-center justify-between'>
                <h1 className=' capitalize'>{subheading}</h1>
                <h1 className=''>{date}</h1>
            </div>
        </div>
    </div>
  )
}

export default Label
