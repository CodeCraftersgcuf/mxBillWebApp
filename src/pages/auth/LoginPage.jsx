// Updated LoginPage.js
import React, { useContext } from "react";
import Input from "../../components/Input";
import logo from "../../assets/images/mxlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "../../constants";
import { toast } from "react-hot-toast"; // Import toast
import { Formik, Form } from "formik";
import { loginSchema } from "../../util/validationSchemas";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../util/mutations/authMutations";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access the login method from AuthContext

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success response:", data);

      const { user, token } = data;
      const {
        firstName,
        lastName,
        email,
        profilePicture,
        accountBalance,
        accountNumber,
        totalIncome,
        totalBillPayment,
        phone,
        id,
      } = user;

      login({
        id,
        user,
        token,
        email,
        firstName,
        lastName,
        profilePicture,
        accountBalance,
        accountNumber,
        totalIncome,
        totalBillPayment,
        phoneNumber: phone,
      });

      toast.success("Login successful!");

      // Check if firstName or lastName is undefined
      if (!firstName || !lastName) {
        // Redirect to Profile Page to complete information
        navigate("/profileInfo");
      } else {
        // Redirect to dashboard after login
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error.message || "Login failed."
      );
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    loginMutation({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="rounded-lg p-8 bg-grayscale100">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="" width={100} />
        </div>
        <h1 className="text-3xl text-center font-bold mb-8 text-black">
          Login to your Account
        </h1>
        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              {["email", "password"].map((field) => (
                <Input
                  key={field}
                  id={field}
                  placeholder={field}
                  type={field}
                  value={values[field]}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched[field] && errors[field]}
                  icon={field === "email" ? icons.email : icons.padlock}
                />
              ))}
              <div className="flex justify-between items-center">
                <Input
                  type="checkbox"
                  name="rememberMe"
                  label={"Remember Me"}
                  onChange={handleChange}
                  checked={values.rememberMe}
                />
                <button
                  className="text-blue-700 cursor-pointer"
                  onClick={() =>
                    navigate("/reset", {
                      state: {
                        email: values.email,
                      },
                    })
                  }
                >
                  Forgot the password?
                </button>
              </div>
              <PrimaryBtn type="submit" disabled={isPending}>
                {isPending ? "Logging In..." : "Login"}
              </PrimaryBtn>
            </Form>
          )}
        </Formik>
        <div className="text-black mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
