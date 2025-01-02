import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { emailValidation } from "../../util/validationSchemas";
import Input from "../../components/Input";
import { icons } from "../../constants";
import PrimaryBtn from "../../components/PrimaryBtn";
import { forgotPassword      } from "../../util/mutations/authMutations";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define schema using reusable email validation
const emailSchema = Yup.object().shape({
  email: emailValidation,
});

const UserEmail = ({ onSuccess }) => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log("Response data:", data);
      if (data.user_id) {
        localStorage.setItem('otpCode', data.otp);
        localStorage.setItem('userIdForPasswordReset', data.user_id);
        console.log("User ID stored:", data.user_id);
        console.log("OTP code stored:", data.otp);
      } else {
        console.error("user_id is undefined");
      }
      navigate("/otp-verification");
      onSuccess();
    },
    
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to send OTP. Check email and try again.");
    }
  });
  
  const handleFormSubmit = (values) => {
    console.log("Email submitted:", values.email);
    
    // Only proceed with mutation, do not call onSuccess until the API is successful
    mutate({ email: values.email });
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Find Your Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email address to search for your account.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form className="space-y-4">
              <div>
                <Input
                  key="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  icon={icons.email} // Adjust icon prop if required
                />
              </div>

              <PrimaryBtn
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                
              >
                 {isPending ? "Submitting..." : "Submit"}
              </PrimaryBtn>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserEmail;
