import React from 'react'
import Box from './components/receiptComponents/Box'

const TransactionRecipt = () => {
  return (
    <div className='flex items-center justify-center py-8 min-h-[80vh]'>
      <div className='md:min-w-[50%] bg-gray-300 rounded-lg shadow-lg shadow-gray-400 p-4'>
        <h1 className='text-2xl font-bold'>E- Receipt</h1>
        <Box list={[
          { heading: 'Amount Paid (NGN)', detail: '&#8358; 823478' },
        ]} />

        <Box list={[
          { heading: 'Biller Category', detail: 'Betting' },
          { heading: 'Biller Provider', detail: 'Bet9ja' },
          { heading: 'Biller Item', detail: 'Bet9ja Wallet Top Up' },
        ]} />

        <Box list={[
          { heading: 'Transaction Date', detail: '2024/12/28' },
          { heading: 'Transaction ID', detail: 'MxPay-2451' },
          { heading: 'Status', detail: 'Completed' , color: 'bg-green-500' },
        ]} />

        <button className='bg-[#130534] hover:bg-[#130534ca] text-white py-2 px-4 rounded-lg mt-4 w-full'>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default TransactionRecipt
