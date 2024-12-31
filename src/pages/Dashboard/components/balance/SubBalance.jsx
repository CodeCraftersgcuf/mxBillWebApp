import React from 'react'

const SubBalance = ({amount = '0',title = 'N/A',paddingBottom = ''}) => {
  return (
    <div className='flex flex-col gap-4'>
        <h1 className='md:text-center text-4xl font-bold'>₦ {amount}</h1>
        <h6 className={`md:text-center text-sm capitalize ${paddingBottom}`}>{title}</h6>
    </div>
  )
}

export default SubBalance
