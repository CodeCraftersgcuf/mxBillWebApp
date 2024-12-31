import React from 'react';
import visaCard from '../../assets/images/visa.jpeg';
import flag from '../../assets/images/flag.png';

const Profile = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 md:py-[100px]">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                {/* Profile Image */}
                <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 mx-auto w-fit">
                    <img
                        src={visaCard}
                        alt="Profile"
                        className="rounded-full w-24 h-24 object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-black text-white rounded-full p-4 flex items-center justify-center">
                        <i className="bx bxs-pencil p-0 m-0"></i>
                    </button>
                </div>

                {/* Form Fields */}
                <form className="mt-6 space-y-4">
                    {/* First Name */}
                    <div className="relative z-[1]">
                        <label className="block text-sm font-semibold text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Peter"
                            className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 z-[-1] text-gray-400"
                        >
                            <i className="bx bxs-pencil"></i>
                        </button>
                    </div>

                    {/* Last Name */}
                    <div className="relative z-[1]">
                        <label className="block text-sm font-semibold text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Odoh"
                            className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 z-[-1] text-gray-400"
                        >
                            <i className="bx bxs-pencil"></i>
                        </button>
                    </div>

                    {/* Email Address */}
                    <div className="relative z-[1]">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="odohpeteamuta@gmail.com"
                            className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2  text-gray-400 flex items-center justify-center"
                        >
                            <i className="bx bxs-pencil"></i>
                        </button>
                    </div>

                    {/* Phone Number */}
                    <div className="relative z-[1]">
                        <label className="block text-sm font-semibold text-gray-700">
                            Phone Number
                        </label>
                        <div className="flex items-center">
                            <div className='flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 border rounded-l-lg'>
                                <img src={flag} alt="nigeria" className='w-6' />
                                <span className="inline-block">+234</span>
                            </div>
                            <input
                                type="tel"
                                placeholder="9112096734"
                                className="block w-full px-4 py-2 border rounded-r-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 z-[-1] text-gray-400"
                        >
                            <i className="bx bxs-pencil"></i>
                        </button>
                    </div>

                    {/* Gender */}
                    <div className="relative z-[1]">
                        <label className="block text-sm font-semibold text-gray-700">
                            Gender
                        </label>
                        <select
                            className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                        >
                            <option value="" disabled selected>
                                Select
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 z-[-1] text-gray-400"
                        >
                            <i className="bx bxs-pencil"></i>
                        </button>
                    </div>
                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full bg-theme-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#4416af] font-semibold"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
