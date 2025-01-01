import axios from 'axios';
import { apiCall } from '../cutomApiCall';
import { API_ENDPOINTS } from '../../apiConfig';

export const getUserProfile = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetUserProfileData,
    'GET',
    undefined,
    token
  );
};

export const getUnreadNotifications = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetNotifications,
    'GET',
    undefined,
    token
  );
};

export const markAllRead = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.markAllNotificationsAsRead,
    'GET',
    undefined,
    token
  );
};

export const checkBvnStatus = async (token) => {
  return await apiCall(
    API_ENDPOINTS.AUTH.CheckBvnStatus,
    'GET',
    undefined,
    token
  );
};

export const verifyBvnStatus = async (token) => {
  return await apiCall(
    API_ENDPOINTS.AUTH.CheckBvnVerified,
    'GET',
    undefined,
    token
  );
};

export const getBillPaymentHistory = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetBillPaymentHistory,
    'GET',
    undefined,
    token
  );
};

export const getTransferHistory = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetTransferHistory,
    'GET',
    undefined,
    token
  );
};

export const generateBvnLinkAgain = async ({ token }) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.RequestBvnConsent,
    'POST',
    undefined,
    token
  );
};

export const getFundAccountNo = async (token) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetFundAccountNo,
    'GET',
    undefined,
    token
  );
};

export const getBalance = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetBalance,
    'GET',
    undefined,
    token
  );
};

export const getMonthlyStats = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetMonthlyStats,
    'GET',
    undefined,
    token
  );
};

export const getYearlyStats = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetYearlyStats,
    'GET',
    undefined,
    token
  );
};

export const getQuarterlyStats = async (token) => {
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetQuarterlyStats,
    'GET',
    undefined,
    token
  );
};
