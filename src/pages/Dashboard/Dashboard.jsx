import React from 'react'
import Balance from './components/balance/Balance'
import Menuitems from './components/Menuitems/Menuitems'
import Recet from './components/Recet/Recet'

const Dashboard = () => {
  const [BalanceData, setBalancedata] = React.useState([
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
    <section className="p-4">
      <div className=''>
          <Balance balanceData={BalanceData} />
          <Menuitems />
          <Recet />
      </div>
    </section>
  )
}

export default Dashboard
