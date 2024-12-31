import React from 'react'
import Status from './components/Status'
import Selection from './components/Selection'
import { Link } from 'react-router-dom'
import MakePayment from './Models/MakePayemnt'
import LowBalance from './Models/LowBalance'

const EnterInfo = () => {
    const [Paymentmodel, setPaymentmodel] = React.useState(false)
    const [showLowBalance, setShowLowBalance] = React.useState(true);
    return (
        <div className='p-4 relative'>
            {/* model component */}
            <MakePayment
                show={Paymentmodel}
                BillName="Electricity Bill"
                AccountName="John Doe"
                Amount="100"
                ChargeApplied="5"
                total="105"
                Balance="500"
                onClose={() => setPaymentmodel(false)}
            />
            {/* low balance model */}
            <LowBalance
                show={showLowBalance}
                onClose={() => setShowLowBalance(false)}
                fundLink={'#'}
            />
            <div className={`mx-w-[100%] md:max-w-[70%]  mx-auto my-4`}>
                <h1 className='text-center capitalize font-bold text-2xl'>Top up your betting account</h1>
                <p className='text-center my-4 md:w-[80%] text-lg mx-auto'>
                    Quickly tup up your bet9ja account and keep the fun going! Enjoy seamless
                    deposits to fund your betting adventures anytime, anywhere.
                </p>
                <div className='bg-gray-400 my-4 w-full h-[4px] rounded'></div>
                <Status />
                <Selection />
                <div className='mt-8'>
                    <Link to={''}>
                        <button onClick={() => setPaymentmodel(!Paymentmodel)} className='px-4 py-2 bg-theme-primary text-white rounded-lg shadow-lg text-center w-fit mx-auto block font-bold'>
                            Confirm & Make Payment
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EnterInfo
