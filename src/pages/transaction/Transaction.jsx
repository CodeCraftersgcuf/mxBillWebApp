import React from 'react'
import Balance from '../Dashboard/components/balance/Balance'
import Recet from '../Dashboard/components/Recet/Recet'
import ReceiptModel from './components/ReceiptModel';

const Transaction = () => {
    const [showReceipt, setShowReceipt] = React.useState(true);
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
        <div className='p-4 relative min-h-[90vh]'>
            <ReceiptModel
                show={showReceipt}
                onClose={() => setShowReceipt(false)}
                amountPaid="₦5,250"
                billerCategory="Betting"
                billerProvider="bet9ja"
                billerItem="Bet9ja Wallet Top Up"
                transactionDate="2024/12/28"
                transactionId="MxPay-2451"
                status="Completed"
            />
            <Balance balanceData={BalanceData} />
            <div className='my-6'>
                <Recet />
            </div>
        </div>
    )
}

export default Transaction
