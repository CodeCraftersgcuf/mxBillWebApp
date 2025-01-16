import React from "react";
import profileDemo from "../../../assets/images/user.png";

const NotificationCan = ({
  title = "N/A",
  date = "N/A",
  time = "N/A",
  paragraph = "N/A",
  profile = profileDemo,
  isNew = false,
}) => {
  return (
    <div className="p-2 md:p-6 bg-gray-300 rounded-lg my-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center p-3 rounded-full bg-gray-400">
            <img src={profile} alt="" className="w-8" />
          </div>
          <div>
            <h1 className="text-[1rem] md:text-xl  font-bold">{title}</h1>
            <p className="text-sm">
              {date} | {time}
            </p>
          </div>
        </div>
        <div>
          {isNew && (
            <div className="bg-theme-primary p-2 px-4 text-sm rounded text-white">
              New
            </div>
          )}
          {/* <div className='bg-theme-primary p-2 px-4 text-sm rounded text-white'>New</div> */}
        </div>
      </div>
      <p className="py-4">{paragraph}</p>
    </div>
  );
};

export default NotificationCan;
