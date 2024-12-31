import React from 'react'

const Status = ({status = true}) => {
    return (
        <>
            <div className='bg-theme-primary text-white rounded-lg shadow-lg p-4 w-full flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Status</h1>
                <h1 className='bg-white text-theme-primary px-4 py-2 rounded font-bold'>{ status ? 'unpaid' : 'paid'  }</h1>
            </div>
        </>
    )
}

export default Status
