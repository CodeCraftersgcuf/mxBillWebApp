import React from 'react'
import Balance from '../Dashboard/components/balance/Balance'
import Recet from '../Dashboard/components/Recet/Recet'

const Transaction = () => {
    const [BalanceData, setBalanceDAta] = React.useState([
        {
            'title': 'Total Bill payment',
            'amount': '200'
        },
        {
            'title': 'Total Balance',
            'amount': '12200'
        },
        {
            'title': 'Total Wallet Balance',
            'amount': '12833'
        },
    ])
    return (
        <div className='p-4'>
            <Balance balanceData={BalanceData} />
            <div className='my-6'>
                <Recet />
            </div>
        </div>
    )
}

export default Transaction
