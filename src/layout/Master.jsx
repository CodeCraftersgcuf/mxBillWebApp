import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import support from "../assets/images/support.png";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(support);

  // Accessing AuthContext
  const { profilePicture } = useContext(AuthContext);
  const token = Cookies.get("authToken");

  useEffect(() => {
    // Get the profile picture from cookies if the context is not set
    const storedProfilePicture = Cookies.get("profilePicture");
    if (profilePicture) {
      setCurrentProfilePicture(profilePicture);
    } else if (storedProfilePicture) {
      setCurrentProfilePicture(storedProfilePicture);
    }
  }, [profilePicture]);

  if (!token) {
    console.error("Token is missing. Redirecting to login...");
    // Optionally, redirect to login here if needed
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-[60] bg-white transition-transform transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  lg:w-[20%] w-64 h-full`}
      >
        <Sidebar setMobileOpen={setMobileOpen} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky z-[99999] top-0 bg-theme-primary text-white flex justify-between items-center p-4 pe-20 sm:pe-0">
          <div className="opacity-0 lg:block hidden"></div>
          <button
            className="block lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className="bx bx-menu text-4xl"></i>
          </button>
          <div className="flex items-center gap-6">
            <Link to={'/help-center'}><img src={support} alt="Support" width={30} /></Link>
            <Link to={'notifications/settings'}><i className="bx bxs-bell-ring text-3xl"></i></Link>
            <Link to={'/profile'}>
              <img
                src={currentProfilePicture}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full border-2 border-white"
              />
            </Link>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
