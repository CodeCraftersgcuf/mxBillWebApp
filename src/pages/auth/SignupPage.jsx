import Input from "../../components/Input";
import logo from "../../assets/images/mxlogo.png";
import { icons } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../util/mutations/authMutations";
import { Form, Formik } from "formik";
import { signupSchema } from "../../util/validationSchemas";
import PrimaryBtn from "../../components/PrimaryBtn";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const { mutate: signup, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      console.log("Signup success response:", data);
      const email = variables.email;

      if (data?.user_id) {
        login({ user: data.user, token: data.token, email }); // Update context
        toast.success(data.message || "Signup successful!");
        navigate("/otp-verification", {
          state: { userId: data.user_id, email },
        });
      } else {
        toast.error("Signup successful, but no user ID found.");
      }
    },
    onError: (error) => {
      console.error("Signup error:", error.response);
      toast.error(error?.message);
    },
  });

  // Form submission handler
  const handleSubmit = (values) => {
    console.log("Form submitted with:", values);
    signup(values); // Pass the form values (including email) to the signup mutation
  };

  return (
    <div className="flex flex-col items-center justify-center   mt-16">
      <div className="  rounded-lg p-8 bg-grayscale100">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="" width={100} />
        </div>
        <h1 className="text-3xl text-center font-bold mb-8 text-black">
          Create your Account
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          onSubmit={handleSubmit} // Call handleSubmit on form submission
          validationSchema={signupSchema}
        >
          {({ errors, touched, handleBlur, handleChange, values }) => (
            <Form>
              {["email", "password", "confirmPassword"].map((field) => (
                <Input
                  key={field}
                  id={field}
                  name={field}
                  type={field === "confirmPassword" ? "password" : field}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values[field]}
                  icon={icons[field === "email" ? "email" : "padlock"]}
                  error={
                    errors[field] && touched[field] ? errors[field] : undefined
                  }
                />
              ))}
              <Input
                type="checkbox"
                name="acceptTerms"
                onChange={handleChange}
                checked={values.acceptTerms}
                label={
                  <>
                    By continuing you accept our&nbsp;
                    <a
                      href="https://mxbillpay.com/privacy-policy/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </>
                }
              />

              <PrimaryBtn type="submit" disabled={isPending}>
                {isPending ? "Signing up..." : "Sign Up"}
              </PrimaryBtn>
            </Form>
          )}
        </Formik>

        <div className="my-4 text-blue-700 cursor-pointer"></div>
        <div className="text-black">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
