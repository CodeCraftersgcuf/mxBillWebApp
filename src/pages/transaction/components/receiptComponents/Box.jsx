import React from 'react'

const Box = ({ list = [] }) => {
    return (
        <div  className='my-4 bg-white p-4 rounded-lg flex flex-col gap-4'>
            {
                list.map((item, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <h1 className='font-semibold'>{item.heading}</h1>
                        {item.color ? <h1 className={`font-bold rounded-lg ${item.color ? item.color + ' text-white' : 'bg-gray-300'} p-2`}>
                            {item.detail}
                        </h1>:
                        <h1 className={`font-bold`}>
                            {item.detail}
                        </h1>
                        }
                        
                    </div>
                ))
            }
        </div>
        // <div className='my-4 bg-white p-4 rounded-lg'>
        //     <div className='flex items-center justify-between'>
        //         <h1 className='font-semibold'></h1>
        //         <h1 className='font-bold'>

        //         </h1>
        //     </div>
        // </div>
    )
}

export default Box
