import React, { useState, useEffect, useContext } from "react";
import ProfileImage from "../../components/ProfileImage";
import Form from "../../components/Form";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "../../util/mutations/accountMutations";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import visaCard from "../../assets/images/visa.jpeg";

const Profile = () => {
    const {
        firstName: contextFirstName,
        lastName: contextLastName,
        email: contextEmail,
        profilePicture: contextProfilePicture,
        login,
    } = useContext(AuthContext);

    const [profileImage, setProfileImage] = useState(visaCard);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
    });

    const token = Cookies.get("authToken");
    useEffect(() => {
        const storedFirstName = contextFirstName || Cookies.get("firstName");
        const storedLastName = contextLastName || Cookies.get("lastName");
        const storedProfilePicture = contextProfilePicture || Cookies.get("profilePicture");
        const storedPhone = Cookies.get("phoneNumber");
    
        // Always get email from cookies if available
        const storedEmail = Cookies.get("email") || contextEmail;
    
        console.log("Inside the UseEffect");
        console.log(storedFirstName, storedLastName, storedEmail, storedProfilePicture, storedPhone);
    
        // Update state
        setProfileImage(storedProfilePicture || visaCard);
        setFormData((prevData) => ({
            ...prevData,
            firstName: storedFirstName || "",
            lastName: storedLastName || "",
            email: storedEmail || prevData.email, // Preserve the email if not available
            phone: storedPhone || "",
            gender: prevData.gender || "",
        }));
    }, [contextFirstName, contextLastName, contextEmail, contextProfilePicture]);
    

    const { mutate: updateProfileMutation, isLoading } = useMutation({
        mutationFn: ({ data }) => updateProfile({ data, token }),
        onSuccess: (response) => {
            toast.dismiss();
            toast.success("Profile updated successfully!");
    
            const updatedProfile = response?.data;
            const baseURL = "https://mxbillpay.hmstech.org/storage/";
    
            // Prepend base URL to the profile picture path
            const fullProfilePictureURL = updatedProfile?.profile_picture
                ? `${baseURL}${updatedProfile.profile_picture}`
                : "";
    
            // Update AuthContext
            login({
                firstName: updatedProfile?.firstName,
                lastName: updatedProfile?.lastName,
                email: Cookies.get("email"), // Preserve the email from cookies
                profilePicture: fullProfilePictureURL,
                phone: updatedProfile?.phone,
                gender: updatedProfile?.gender,
                accountBalance: updatedProfile?.accountBalance,
            });
    
            // Update cookies (exclude email as it is not editable)
            Cookies.set("firstName", updatedProfile?.firstName || "", { secure: true, sameSite: "strict" });
            Cookies.set("lastName", updatedProfile?.lastName || "", { secure: true, sameSite: "strict" });
            Cookies.set("profilePicture", fullProfilePictureURL || "", { secure: true, sameSite: "strict" });
            Cookies.set("phoneNumber", updatedProfile?.phone || "", { secure: true, sameSite: "strict" });
            Cookies.set("accountBalance", updatedProfile?.accountBalance || "", { secure: true, sameSite: "strict" });
    
            // Update state
            setProfileImage(fullProfilePictureURL || visaCard);
            setFormData({
                firstName: updatedProfile?.firstName || "",
                lastName: updatedProfile?.lastName || "",
                email: Cookies.get("email") || "", // Use email from cookies
                phone: updatedProfile?.phone || "",
                gender: updatedProfile?.gender || "",
            });
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(`Error updating profile: ${error.message}`);
        },
    });
    
    
    
    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({ ...prevData, profilePicture: file }));
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form...");
        const updatedData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                updatedData.append(key, formData[key]);
            }
        });
        console.log("Inside the handleSubmit", formData);
        updateProfileMutation({ data: updatedData, token });
    };

    console.log("The Form Data", formData);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 md:py-[100px]">
            <Toaster />
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                <ProfileImage profileImage={profileImage} handleImageChange={handleImageChange} />
                <Form
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    disableEmail
                />
            </div>
        </div>
    );
};

export default Profile;
