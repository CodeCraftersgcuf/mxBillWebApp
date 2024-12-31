import React from 'react'
import Account from './Account'
import Betting from '../../../assets/images/1xbet.jpeg'
import betway from '../../../assets/images/betway.jpeg'

const AccountCan = () => {
    const [account, setaccount] = React.useState([
        {
            'image': Betting,
            'link' : '/betting/EnterInfo'
        },
        {
            'image': betway,
            'link' : '/betting/EnterInfo'
        }
    ])
    return (
        <div className='grid grid-cols-2 gap-4'>
            {
                account.map((item,index) => (
                    <Account key={index} image={item.image} addressLink={item.link}/>
                ))
            }
        </div>
    )
}

export default AccountCan
