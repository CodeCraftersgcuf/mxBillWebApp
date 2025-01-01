import React from "react";

const ProfileImage = ({ profileImage, handleImageChange }) => (
    <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 mx-auto w-fit">
        <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
        />
        <label className="absolute bottom-0 right-0 bg-black text-white rounded-full p-2 cursor-pointer">
            <i className="bx bxs-pencil"></i>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
            />
        </label>
    </div>
);

export default ProfileImage;
