import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({ title = 'N/A', icon = '',iconType = 'bx',textSize= 'sm',iconSize ='2xl' ,circleSize='14'}) => {
    return (
        <>
            <Link to={'#'}>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className={`bg-theme-primary w-${circleSize} h-${circleSize} flex items-center justify-center rounded-full`} >
                        {
                            iconType === 'bx' ? <i className={`bx ${icon} text-white text-2xl md:text-${iconSize}`}></i> : <i className={`${icon} text-white text-2xl md:text-${iconSize}`}></i>
                        }
                    </div>
                    <p className={`capitalize text-${textSize} text-center font-bold`}>{title}</p>
                </div>
            </Link>
        </>
    )
}

export default Item
