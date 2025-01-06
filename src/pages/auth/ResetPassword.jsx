import Input from "../../components/Input";
import logo from "../../assets/images/mxlogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import { forgetPasswordSchema } from "../../util/validationSchemas";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import { icons } from "../../constants";
import { resetPassword } from "../../util/mutations/authMutations";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userIdForPasswordReset");

  const { mutate: resetPass, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success("Password reset successful!");
      localStorage.removeItem("userIdForPasswordReset"); // Clear userId after successful reset
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Password reset failed. Please try again.");
    },
  });

  const handleSubmit = (data) => {
    const { newPassword, confirmPassword } = data;

    if (!userId) {
      toast.error("User ID is missing. Please retry the password reset process.");
      return;
    }

    // Call the mutation with the required data
    resetPass({
      userId,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="rounded-lg p-8 bg-grayscale100 ">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="" width={100} />
        </div>
        <h1 className="text-3xl text-center font-bold mb-8 text-black">
          Reset Your Password
        </h1>
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={forgetPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleBlur, handleChange }) => (
            <Form>
              <Input
                id="newPassword"
                name="newPassword"
                placeholder="New Password"
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.newPassword && errors.newPassword}
                icon={icons.padlock}
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
                icon={icons.padlock}
              />
              <PrimaryBtn type="submit" disabled={isPending}>
                {isPending ? "Resetting Password..." : "Reset Password"}
              </PrimaryBtn>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
