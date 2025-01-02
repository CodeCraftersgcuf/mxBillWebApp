import { useRef, useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { verifyEmailOtp, resendOtp } from "../../util/mutations/authMutations";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { verifyPasswordOtp } from "../../util/mutations/authMutations";

function OtpVerification({ numberOfDigits = 4, isOtp, onSuccess }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [resendTimer, setResendTimer] = useState(10);
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { token } = useContext(AuthContext);

  const authToken = token || Cookies.get("authToken");
  const email = state?.email || Cookies.get("email"); // Fallback to Cookies

  // Debug log to check email
  // console.log("Email passed to OTP Verification:", email);

  const { mutate: verifyOtpMutation, isPending } = useMutation({
    mutationFn: ({ otpValue }) => verifyEmailOtp({ otp: otpValue }, authToken),
    onSuccess: (data) => {
      toast.success("OTP verified successfully!");
      navigate("/profileInfo");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "OTP verification failed.");
    },
  });

  const userId = localStorage.getItem("userIdForPasswordReset");
  const otpCode = localStorage.getItem("otpCode");
  const { mutate: verifyOtpPasswordMutation, isPending: isPasswordOtpPending } =
    useMutation({
      mutationFn: ({ otpValue }) => {
        if (!userId) {
          throw new Error("User ID is missing. Please retry the process.");
        }
        if (otpCode == otpValue) {
          console.log("The values correctly matches");
          return verifyPasswordOtp({ otp: otpValue, user_id: userId });
        }
      },
      onSuccess: (data) => {
        toast.success(data.message || "OTP verified successfully!");
        // localStorage.removeItem("userIdForPasswordReset");
        localStorage.removeItem("otpCode");
        console.log("Password reset OTP verified. Data:", data);
        navigate("/resetpassword");
      },
      onError: (error) => {
        console.error("Verification Error:", error);
        toast.error(
          error?.response?.data?.message ||
            "OTP verification failed. Please try again."
        );
      },
    });

  const { mutate: resendOtpMutation, isLoading: isResending } = useMutation({
    mutationFn: () => {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      };

      // Ensure the `email` is sent in the correct format
      return resendOtp({
        data: { email }, // Email in the body
        headers,
      });
    },
    onSuccess: (data) => {
      toast.success(data.message || "OTP sent successfully!");
      setResendTimer(60);
    },
    onError: (error) => {
      console.error("Resend OTP Error:", error);
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    },
  });

  const handleChange = (value, index) => {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };
  const handleOtpSubmit = () => {
    const otpValue = otp.join("");

    // Ensure OTP length matches the required number of digits
    if (otpValue.length !== numberOfDigits) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    // Check if userId exists for password reset
    const check = localStorage.getItem("userIdForPasswordReset");
    if (check) {
      console.log("User ID exists for password reset:", check);
      verifyOtpPasswordMutation({ otpValue });
    } else {
      verifyOtpMutation({ otpValue });
    }
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email is required to resend OTP.");
      return;
    }
    resendOtpMutation();
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [resendTimer]);

  return (
    <article className="flex flex-col items-center h-screen  ">
      <p className="text-2xl font-medium mt-12 text-center">
        OTP Input With Validation
      </p>
      <p className="text-base text-white mt-4 bg-[#323232] p-4 rounded-md text-center max-w-lg">
        Enter the OTP sent to your email. If incorrect, you'll see an error
        message below.
      </p>

      <p className="text-base mt-6 mb-4">One Time Password (OTP)</p>

      <div className="flex items-center justify-center gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            ref={(ref) => (otpBoxReference.current[index] = ref)}
            className="border w-16 h-16 text-center text-xl p-3 rounded-md text-white bg-blue-500 focus:border-2 focus:outline-none"
          />
        ))}
      </div>

      {!otpCode && (
        <p className="mt-3 font-urbanist-regular">
          {resendTimer > 0 ? (
            <span className="text-black">{`Resend OTP in ${resendTimer} s`}</span>
          ) : (
            <span
              className="text-primary underline hover:cursor-pointer hover:opacity-70 active:opacity-70 disabled:opacity-50"
              onClick={handleResendOtp}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </span>
          )}
        </p>
      )}
      <div className="max-w-4xl">
        {" "}
        <PrimaryBtn onClick={handleOtpSubmit} disabled={isPending}>
          {isPending ? "Verifying..." : "Verify OTP"}
        </PrimaryBtn>
      </div>
    </article>
  );
}

export default OtpVerification;
