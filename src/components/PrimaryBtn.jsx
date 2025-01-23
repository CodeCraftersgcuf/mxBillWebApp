import React from 'react'

const PrimaryBtn = ({ children, ...props }) => {
    return (
        <button
            className={`w-full px-3 py-3 font-urbanist-bold rounded-lg mt-4 bg-[#130634] hover:bg-[#130634ca] active:opacity-70 disabled:opacity-50 text-white`}
            {...props}
        >
            {children}
        </button>
    )
}

export default PrimaryBtn