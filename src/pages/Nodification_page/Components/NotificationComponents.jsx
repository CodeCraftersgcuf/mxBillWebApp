import React from 'react'
import NotificationCan from './NotificationCan'

const NotificationComponents = () => {
    let demoData =[
        {
            name:'Nodification 1',
            date:'2 / 2 / 2025',
            time: '3:00 PM',
            paragraph:'This is the first notification paragraph'
        },
        {
            name:'Nodification 2',
            date:'2 / 2 / 2025',
            time: '12:00 PM',
            paragraph:'This is the first notification paragraph'
        },
    ]
    return (
        <div className='py-4 my-4'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold'>Recet Nodification</h1>
                <button className='text-xl'>Mark All Read</button>
            </div>
            {/* notification-can */}
            <div className='py-4'>
                {
                    demoData.map((data, index) => (
                        <NotificationCan key={index} time={data.time} title={data.name} date={data.date} paragraph={data.paragraph} />
                    ))
                }
                {/* <NotificationCan/> */}
            </div>
        </div>
    )
}

export default NotificationComponents
