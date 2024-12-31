import React from 'react'
import Balance from '../Dashboard/components/balance/Balance'
import Menuitems from '../Dashboard/components/Menuitems/Menuitems'

const Bill_payment = () => {
    const [BalanceData, setBalanceData] = React.useState([
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
    <div className='p-4 text-4xl'>
      <Balance balanceData={BalanceData}/>
        <Menuitems textSize={'lg'} icon={'2xl'} circleSize={'20'}  perColumn='4'/>
    </div>
  )
}

export default Bill_payment
