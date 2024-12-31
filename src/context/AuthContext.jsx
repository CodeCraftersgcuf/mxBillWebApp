import { createContext, useReducer } from "react";
import Cookies from "js-cookie"; 
export const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  email: null,
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
    const { user, token, email } = data;
    Cookies.set("authToken", token, { secure: true, sameSite: "strict" });
    Cookies.set("userId", user.userId, { secure: true, sameSite: "strict" });
    Cookies.set("email", email, { secure: true, sameSite: "strict" });
    dispatch({ type: "LOGIN", payload: { user, token, email } });
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    Cookies.remove("email");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
