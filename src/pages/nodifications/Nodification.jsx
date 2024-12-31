import React, { useState } from "react";

const Nodification = () => {
  const [settings, setSettings] = React.useState({
    generalNotifications: true,
    sound: false,
    vibrate: true,
    specialOffers: false,
    promoDiscounts: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex items-center justify-content min-h-[80vh] py-8">
        <div className="w-full max-w-sm mx-auto p-6 bg-gray-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <span className="text-gray-800 capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </span>
                <button
                  onClick={() => handleToggle(key)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    value ? "bg-black" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      value ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-[#130534] text-white py-2 px-4 rounded-md hover:bg-[#130534ca] transition">
            Update Settings
          </button>
        </div>
    </div>
  );
};

export default Nodification;
