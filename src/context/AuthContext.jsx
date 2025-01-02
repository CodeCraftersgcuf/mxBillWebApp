import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const initialState = {
  user: null,
  token: Cookies.get("authToken") || null,
  email: null,
  firstName: null,
  lastName: null,
  profilePicture: null,
  accountBalance: Cookies.get("accountBalance") || null, // Read from cookies
  accountNumber: null,
  totalIncome: null,
  totalBillPayment: null,
  phoneNumber: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return { ...initialState, token: null }; // Reset to initial state on logout
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
      phoneNumber,
    } = data;

    const currentToken = token || state.token; // Preserve the current token if not provided

    if (currentToken) {
      Cookies.set("authToken", currentToken, { secure: true, sameSite: "strict" });
    }
    if (accountBalance) {
      Cookies.set("accountBalance", accountBalance, { secure: true, sameSite: "strict" });
    }
    const currentAccountBalance = accountBalance || state.accountBalance; // Preserve the current account balance from state
    
    Cookies.set("userId", user?.userId || Cookies.get("userId"), { secure: true, sameSite: "strict" });
    Cookies.set("email", email || Cookies.get("email"), { secure: true, sameSite: "strict" });
    Cookies.set("profilePicture", profilePicture || Cookies.get("profilePicture"), { secure: true, sameSite: "strict" });
    Cookies.set("firstName", firstName || Cookies.get("firstName"), { secure: true, sameSite: "strict" });
    Cookies.set("lastName", lastName || Cookies.get("lastName"), { secure: true, sameSite: "strict" });
    Cookies.set("accountNumber", accountNumber || Cookies.get("accountNumber"), { secure: true, sameSite: "strict" });
    Cookies.set("phoneNumber", phoneNumber || Cookies.get("phoneNumber"), { secure: true, sameSite: "strict" });

    dispatch({
      type: "LOGIN",
      payload: {
        user,
        token: currentToken,
        email,
        firstName,
        lastName,
        profilePicture,
        accountBalance : currentAccountBalance,
        accountNumber,
        totalIncome,
        totalBillPayment,
        phoneNumber,
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
    Cookies.remove("phoneNumber");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
