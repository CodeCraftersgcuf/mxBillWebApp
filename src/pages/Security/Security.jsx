import React from 'react';
import InputField from './components/InputField';

const Security = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-sm">
                <h1 className="text-xl font-semibold text-theme-primary text-center mb-6">Update Password</h1>
                <form>
                    {/* Old Password */}
                    <InputField
                        label="Old Password"
                        type="password"
                        icon="bxs-lock"
                        mg={'mb-8'}
                    />

                    {/* New Password */}
                    <InputField
                        label="New Password"
                        type="password"
                        icon="bxs-lock"
                    />

                    {/* Confirm New Password */}
                    <InputField
                        label="Confirm New Password"
                        type="password"
                        icon="bxs-lock"
                    />

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full mt-12 bg-theme-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#130534e7]"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Security;
