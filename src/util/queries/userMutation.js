import axios from "axios";
import { API_ENDPOINTS } from "../../apiConfig";

export const UserDetail = async (data) => {
    try {
        const response = await axios.post(API_ENDPOINTS.USER_INFORMATION.UserDetail, data);
        return response.data;

    } catch (error) {
        throw Error(
            error?.response?.data?.message || 'Failed to get user details due to unknown error'
        );
    }
};

export const UserAccount = async (data) => {
    try {
        const response = await axios.post(API_ENDPOINTS.USER_INFORMATION.UserAccount, data);
        return response.data;

    } catch (error) {
        throw Error(
            error?.response?.data?.message || 'Failed to get user account details due to unknown error'
        );

    }
}