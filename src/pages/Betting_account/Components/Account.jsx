import React from 'react'
import { Link } from 'react-router-dom'
const Account = ({image = '',addressLink = '#'}) => {
  return (
    <Link to={addressLink} className=''>
      <div className=''>
          <img src={image} alt="account image" className='w-full h-[100px] md:h-[200px] object-cover rounded-lg' />
      </div>
    </Link>
  )
}

export default Account
