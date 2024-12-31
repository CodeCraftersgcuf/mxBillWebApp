import React from 'react'
import { Link } from 'react-router-dom'
import Label from './Label'

const Recet = () => {
  return (
    <div className=''>
        <div className='flex items-center justify-between gap-2'>
            <h1 className='font-bold text-2xl'>Recet Transactions</h1>
            <Link to={'#'}>
            <h6 className='text-lg  font-bold'>See all</h6>
            </Link>
        </div>
        <div className='flex flex-col gap-4 py-4'>
            <Label heading={'Data Bundle'} subheading={'mtn 500mb data 3 days plan'} amount={'100'} date={'11/12/2024'} />
        </div>
    </div>
  )
}

export default Recet
