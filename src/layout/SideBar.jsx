import React from 'react';
import { Link } from 'react-router-dom';
import LinkComp from './components/sidebar/Link';

const Sidebar = ({ setMobileOpen }) => {
    const [links, setlinks] = React.useState([
        {
            "name": 'dashboard',
            "link": '/dashboard',
            "icon": 'bxs-dashboard'
        },
        {
            "name": 'transactions',
            "link": '/transactions',
            "icon": 'bx-transfer-alt'
        },
        {
            "name": 'make bill payment',
            "link": '/bill/payment',
            "icon": 'bxs-wallet'
        },
        {
            "name": 'fund wallet',
            "link": '/fund/wallet',
            "icon": 'bx-wallet'
        },
        {
            "name": 'Virtual Card',
            "link": '/virtual/card',
            "icon": 'bxs-credit-card-front'
        },
        {
            "name": 'Edit Profile',
            "link": '/profile',
            "icon": 'bx-user-circle'
        },
        {
            "name": 'Nodifications',
            "link": '/nodifications',
            "icon": 'bxs-bell-ring'
        },
        {
            "name": 'Security',
            "link": '/security',
            "icon": 'bxs-check-shield'
        },
        {
            "name": 'Help Center',
            "link": '/help-center',
            "icon": 'bx-info-circle'
        },
        {
            "name": 'Privacy Policy',
            "link": '/privacy-policy',
            "icon": 'bxs-lock'
        },
    ])
    return (
        <div className="bg-theme-primary text-white border-r h-screen">
            {/* Close button for mobile */}
            <div className="flex justify-end lg:hidden mb-4">
                <button
                    className="text-xl cursor-pointer p-4"
                    onClick={() => setMobileOpen(false)}
                >✕</button>
            </div>
            {/* Sidebar content */}
            <div className="px-4 pt-4">
                <h1 className='text-4xl text-white font-extrabold'>Logo Name</h1>
            </div>
            {/* Menu */}
            <div className="mt-6 h-[70vh] overflow-auto px-4">
                <nav className="flex flex-col gap-3">
                    {
                        links.map((x, index) => (
                            <LinkComp key={index} name={x.name} link={x.link} icon={x.icon} />
                        ))
                    }
                </nav>
            </div>
            <div className='p-4'>
                <button className='bg-white flex items-center justify-start py-2 px-2 gap-2 text-black font-bold rounded-lg w-full'>
                    <i className='bx bx-log-in-circle text-4xl text-red-700'></i> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
