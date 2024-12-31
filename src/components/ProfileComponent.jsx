import { useRef, useState, useEffect } from "react";

const ProfileComponent = ({ initialImage, onImageChange, editIcon }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(initialImage);

  useEffect(() => {
    setProfileImage(initialImage);
  }, [initialImage]);

  const handleImageUpload = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl);
      setProfileImage(imageUrl);
      if (onImageChange) {
        onImageChange(file); // Notify parent component of image change
      }
    }

  }

  return (
    <div className="flex justify-center mb-4">
      <span className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <button
          onClick={handleImageUpload}
          className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full border-2 bg-blue-500 border-white"
          aria-label="Edit Profile Image"
        >
          <img src={editIcon} alt="Edit" className="w-5 h-5" />
        </button>
      </span>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileComponent;
