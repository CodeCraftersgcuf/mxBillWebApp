import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import support from '../assets/images/support.png'

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <div className="flex mx-auto">
                {/* Sidebar */}
                <div
                    className={`container fixed lg:static top-0 left-0 z-20 bg-white transition-transform transform ${
                        mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:w-[20%] w-64`}
                >
                    <Sidebar setMobileOpen={setMobileOpen} />
                </div>
                {/* Main Content */}
                <div className={`container flex-1 h-screen overflow-auto bg-gray-100 transition-all duration-300 `} >
                    <div className="">
                        <div className="sticky z-[99999] top-0 bg-theme-primary text-white flex justify-between items-center p-4 m-0">
                            <button
                                className="block lg:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                <i className='bx bx-menu text-4xl'></i>
                            </button>
                            <button
                                className="hidden lg:block opacity-0 cursor-default"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <i className="fa-solid fa-bars text-2xl"></i>
                            </button>
                            <div className="flex items-center gap-6 w-fit">
                                <img src={support} alt='Support' width={30} className='' />
                                <i className='bx bxs-bell-ring text-3xl'></i>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2rQqSyR1xF2AJYlijHJvqb-vhe4EyWSc5ZA&s" alt="profile img"
                                className='w-[50px] rounded-full' />
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
