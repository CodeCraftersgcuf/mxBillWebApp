import React from 'react'

const Options = ({icon='' , heading =''}) => {
    return (

    <div className='p-4 bg-gray-200 rounded-lg'>
        <div className='flex items-center gap-4 text-2xl'>
            {/* select boxicon or mouse  */}
            {icon}
            <h1 className='capitalize'>{heading}</h1>
        </div>
    </div>
    )
}

export default Options
