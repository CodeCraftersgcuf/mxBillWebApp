import React from 'react'
import viseCard from '../../../../assets/images/visa.jpeg'

const CardCan = () => {
  return (
    <div className='flex items-center justify-around gap-4 -translate-y-8'>
        <div className='rounded-xl overflow-hidden'>
            <img src={viseCard} alt="vise card" className='w-[300px] mix-blend-darken' />
        </div>
        <div className='rounded-xl overflow-hidden'>
            <img src={viseCard} alt="vise card" className='w-[300px] mix-blend-darken' />
        </div>
        <div className='rounded-xl overflow-hidden'>
            <img src={viseCard} alt="vise card" className='w-[300px] mix-blend-darken' />
        </div>
    </div>
  )
}

export default CardCan
