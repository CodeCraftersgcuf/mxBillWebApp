// Updated AuthContext.js
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  email: null,
  firstName: null,
  lastName: null,
  profilePicture: null,
  accountBalance: null,
  accountNumber: null,
  totalIncome: null,
  totalBillPayment: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...initialState }; // Reset to initial state on logout
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save token and email to cookies for better security
  const login = (data) => {
    const {
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
    } = data;

    Cookies.set("authToken", token, { secure: true, sameSite: "strict" });
    Cookies.set("userId", user.userId, { secure: true, sameSite: "strict" });
    Cookies.set("email", email, { secure: true, sameSite: "strict" });
    Cookies.set("profilePicture", profilePicture, { secure: true, sameSite: "strict" });
    Cookies.set("firstName", firstName, { secure: true, sameSite: "strict" });
    Cookies.set("lastName", lastName, { secure: true, sameSite: "strict" });
    Cookies.set("accountBalance", accountBalance, { secure: true, sameSite: "strict" });
    Cookies.set("accountNumber", accountNumber, { secure: true, sameSite: "strict" });

    dispatch({
      type: "LOGIN",
      payload: {
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
      },
    });
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    Cookies.remove("email");
    Cookies.remove("profilePicture");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("accountBalance");
    Cookies.remove("accountNumber");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
