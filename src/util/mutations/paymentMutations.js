import axios from 'axios';
import { API_ENDPOINTS } from '../../apiConfig';
import { apiCall } from '../customApiCall';

export const getReceipientDetails = async ({ data, token }) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetRecepientDetails,
    'POST',
    data,
    token
  );
};

export const transferMoney = async ({ data, token }) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.Trasnsfer,
    'POST',
    data,
    token
  );
};
