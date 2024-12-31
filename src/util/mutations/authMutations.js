import { API_ENDPOINTS } from '../../apiConfig';
import { apiCall } from '../cutomApiCall';

export const registerUser = async (data) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.Register, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Signup failed due to unknown error'
    );
  }
};

export const loginUser = async (data) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.Login, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Login failed due to unknown error'
    );
  }
};

export const verifyEmailOtp = async (data, token) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.VerfiyEmailOtp, 'POST', data, token);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Signup failed due to unknown error'
    );
  }
};

export const resendOtp = async ({ data, token }) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.ResendOtp, 'POST', data, token);
    return response;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || 'Resend OTP failed due to unknown error'
    );
  }
};


// Forgot Password: Send OTP to user's email
export const forgotPassword = async (data) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.ForgotPassword, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Failed to send OTP due to unknown error'
    );
  }
};

// Verify OTP for password reset
export const verifyPasswordOtp = async (data) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.VerifyPasswordOtp, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Invalid OTP or verification failed'
    );
  }
};

// Reset Password
export const resetPassword = async (data) => {
  try {
    const response = await apiCall(API_ENDPOINTS.AUTH.ResetPassword, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(
      error?.message || 'Password reset failed due to unknown error'
    );
  }
};
