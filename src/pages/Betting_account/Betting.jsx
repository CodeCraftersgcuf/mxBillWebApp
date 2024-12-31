import React from 'react'
import AccountCan from './Components/AccountCan'

const Betting = () => {
  return (
    <div className='p-4'>
      <div className='mx-w-[100%] md:max-w-[70%] mx-auto'>
        <div className='bg-theme-primary text-white rounded-lg shadow-lg p-8 w-full flex flex-col items-center justify-center'>
            <i className='bx bx-bell text-8xl'></i>
            <h1 className='uppercase font-bold mt-8'>Fund Your Betting account</h1>
        </div>
        {/* hr not working so i use this */}
        <div className='bg-gray-400 my-4 w-full h-[4px] rounded'></div>
        <AccountCan/>
      </div>
    </div>
  )
}

export default Betting
