import React from 'react'

const Header = ({heading='',amount = 0,Subheading='N/A'}) => {
  return (
    <div className='px-4 py-6 md:py-12 bg-theme-primary text-white rounded-none md:rounded-lg shadow-md shadow-gray-500 flex items-center justify-center flex-col gap-4'>
        <h1 className='text-lg text-yellow-600 md:text-2xl lg:text-4xl font-bold uppercase'>{heading}</h1>
        <h1 className=' text-lg md:text-2xl amount-can'>
            <span className='text-3xl font-bold'>₦ {amount}</span>
        </h1>
        <p className='text-lg capitalize'>{Subheading}</p>
    </div>
  )
}

export default Header
