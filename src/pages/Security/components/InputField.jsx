import React from 'react';

const InputField = ({ label, type, icon ,mg = 'mb-4' }) => {
    return (
        <div className={`flex items-center bg-white rounded-md shadow-sm border border-gray-300 p-2 ${mg}`}>
            <div className="flex justify-center items-center">
                <i className={`bx ${icon} text-black text-xl`}></i>
            </div>
            <input
                type={type}
                placeholder={label}
                className="w-full pl-2 pr-4 py-2 focus:outline-none bg-transparent"
            />
        </div>
    );
};

export default InputField;
