import React from "react";
import Input from "../../components/Input";
import { icons } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { createIndividualAccount } from "../../util/mutations/accountMutations.js";
import { Formik, Form } from "formik";
import PrimaryBtn from "../../components/PrimaryBtn.jsx";
import { individualSchema } from "../../util/validationSchemas.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "../../components/ProfileComponent.jsx";

const GetProfileInfo = ({ edit }) => {
  const { user, logout } = useContext(AuthContext); // Moved inside the functional component
  const userId = user?.id || Cookies.get("userId"); // Retrieve userId from context or cookies
  const navigate = useNavigate(); // Moved inside the functional component

  const [image, setImage] = React.useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const token = Cookies.get("authToken"); // Retrieve the token from cookies
      if (!token) {
        throw new Error("Unauthorized: Token not found");
      }
      return await createIndividualAccount({ data: formData, token });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile information created successfully!");

      // Call logout to clear session data
      logout();

      // Navigate to the login page
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error creating account:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    },
  });

  const handleImage = (imageData) => {
    if (!imageData) {
      toast.error("Please upload an image");
      return;
    }
    setImage(imageData);
  };

  const handleSubmit = (data) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phone", data.phone);

    console.log("Submitting form data:", formData);
    mutate(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className=" rounded-lg p-8 bg-grayscale100">
        <ProfileComponent
          initialImage={icons.userDefault3}
          editIcon={icons.edit3}
          onImageChange={handleImage}
        />
        <h1 className="text-3xl text-center font-bold mb-8 text-black">
          {edit ? "Edit Profile" : "Create Profile"}
        </h1>
        <Formik
          initialValues={{ firstName: "", lastName: "", phone: "" }}
          onSubmit={handleSubmit} // Call handleSubmit on form submission
          validationSchema={individualSchema}
        >
          {({ errors, touched, handleBlur, handleChange, values }) => (
            <Form>
              {["firstName", "lastName"].map((field) => (
                <Input
                  key={field}
                  id={field}
                  name={field}
                  type={"text"}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values[field]}
                  icon={icons[field]}
                  error={
                    errors[field] && touched[field] ? errors[field] : undefined
                  }
                />
              ))}

              <Input
                key={"phone"}
                id="phone"
                name={"phone"}
                type={"number"}
                placeholder={"Phone Number"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                icon={icons.telephone}
                error={errors.phone && touched.phone ? errors.phone : undefined}
              />
              <PrimaryBtn type="submit" disabled={isPending}>
                {isPending ? "Submitting, please wait..." : "Submit"}
              </PrimaryBtn>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GetProfileInfo;
