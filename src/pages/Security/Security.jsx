import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import { updatePassword } from "../../util/mutations/accountMutations";

// Validation schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, "Old password must be at least 8 characters long")
    .required("Old password is required"),
  password: Yup.string()
    .min(8, "New password must be at least 8 characters long")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Security = () => {
  const token = Cookies.get("authToken");

  // React Query mutation
  const { mutate: updatePasswordMutation, isLoading } = useMutation({
    mutationFn: (data) => updatePassword({ data, token }),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Password updated successfully!");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error( "Wrong old password. Failed to update password");
    },
  });

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-theme-primary text-center mb-6">
          Update Password
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            updatePasswordMutation(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Old Password */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <Field
                  name="oldPassword"
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                    errors.oldPassword && touched.oldPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.oldPassword && touched.oldPassword && (
                  <p className="text-red-500 text-sm">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Update Button */}
              <button
                type="submit"
                className={`w-full bg-theme-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#130534e7] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Security;
