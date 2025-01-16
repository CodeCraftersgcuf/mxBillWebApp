import React from 'react';

const AcountCan = ({ accountNumber = 'N/A', bankName = 'N/A', accountName = 'N/A' }) => {
    const handleCopy = () => {
        if (accountNumber !== 'N/A') {
            navigator.clipboard.writeText(accountNumber).then(() => {
                alert('Account number copied to clipboard!');
            }).catch((err) => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            alert('No account number to copy!');
        }
    };

    return (
        <div className='bg-theme-primary text-white p-4 rounded-lg shadow-md shadow-gray-500 my-8 min-w-full md:min-w-[60%]'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-sm md:text-2xl font-bold capitalize'>Account No.</h1>
                <div className='flex items-center gap-4 text-sm md:text-2xl'>
                    <h1 className='account-number'>{accountNumber}</h1>
                    <button
                        className='py-1 rounded-lg copy-btn'
                        onClick={handleCopy}
                    >
                        <i className='bx bxs-copy text-3xl'></i>
                    </button>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <h1 className='text-sm md:text-lg text-slate-500'>Bank Name</h1>
                <div className='flex items-center gap-4 text-sm  md:text-lg'>
                    <h1 className='account-number  text-sm  md:text-lg'>{bankName}</h1>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <h1 className='text-sm md:text-lg text-slate-500'>Account Name</h1>
                <div className='flex items-center gap-4 text-sm md:text-lg'>
                    <h1 className='account-number  text-sm  md:text-lg'>{accountName}</h1>
                </div>
            </div>

        </div>
    );
};

export default AcountCan;
