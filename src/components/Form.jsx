import React from "react";
import InputField from "../pages/Security/components/InputField";
import flag from "../assets/images/flag.png";

const Form = ({ formData, handleInputChange, handleSubmit, isLoading, disableEmail }) => {
    console.log("Inside the Form Component", formData);

    return (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* First Name Field */}
            <InputField
                label="First Name"
                type="text"
                placeholder="First Name"
                value={formData.firstName || ""}
                name="firstName"
                onChange={handleInputChange}
                icon="bx bxs-pencil"
            />

            {/* Last Name Field */}
            <InputField
                label="Last Name"
                type="text"
                placeholder="Last Name"
                value={formData.lastName || ""}
                name="lastName"
                onChange={handleInputChange}
                icon="bx bxs-pencil"
            />

            {/* Email Field */}
            <InputField
                label="Email Address"
                type="email"
                placeholder="Email Address"
                value={formData.email || ""}
                name="email"
                readOnly={disableEmail}
                icon="bx bxs-lock"
            />

            {/* Phone Number Field */}
            <div className="relative z-[1]">
                <label className="block text-sm font-semibold text-gray-700">
                    Phone Number
                </label>
                <div className="flex items-center">
                    <div className="flex items-center justify-center gap-2 bg-gray-100 px-4 py-2 border rounded-l-lg">
                        <img src={flag} alt="flag" className="w-6" />
                        <span className="inline-block">+234</span>
                    </div>
                    <input
                        type="tel"
                        placeholder="9112096734"
                        className="block w-full px-4 py-2 border rounded-r-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                        value={formData.phone || ""}
                        name="phone"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {/* Gender Field */}
            <div className="relative z-[1]">
                <label className="block text-sm font-semibold text-gray-700">
                    Gender
                </label>
                <select
                    className="block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-indigo-500"
                    value={formData.gender || ""}
                    name="gender"
                    onChange={handleInputChange}
                >
                    <option value="" disabled>
                        Select
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`w-full bg-theme-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#4416af] font-semibold ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
            >
                {isLoading ? "Updating..." : "Update"}
            </button>
        </form>
    );
};

export default Form;
