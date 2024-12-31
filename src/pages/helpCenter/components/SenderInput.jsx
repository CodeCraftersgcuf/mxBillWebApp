import React from 'react'

const SenderInput = () => {
    return (
        <div className='flex items-center'>
            <div class="flex items-center w-full bg-gray-200 rounded-full px-4 py-2 shadow-lg">
                <input
                    type="text"
                    placeholder="Enter your message..."
                    class="flex-grow bg-gray-200 outline-none text-black placeholder-black"
                />

                <button class="ml-2 text-black text-2xl">
                    <i class="fa-regular fa-image"></i>
                </button>
            </div>
            <button class="ml-2 bg-black text-white p-2 text-2xl rounded-full flex items-center justify-center">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    )
}

export default SenderInput
