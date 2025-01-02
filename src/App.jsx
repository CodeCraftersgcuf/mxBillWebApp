import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Master from "./layout/Master";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/transaction/Transaction";
import Bill_payment from "./pages/Bill_payment/Bill_payment";
import FundWallet from "./pages/fund_wallet/FundWallet";
import VirtualCard from "./pages/virtual_card/VirtualCard";
import Profile from "./pages/profile/Profile";
import Security from "./pages/Security/Security";
import HelpCenter from "./pages/helpCenter/HelpCenter";
import Policy from "./pages/policy/Policy";
import Betting from "./pages/Betting_account/Betting";
import EnterInfo from "./pages/EnterInfo/EnterInfo";
import Nodification from "./pages/nodifications/Nodification";
import TransactionRecipt from "./pages/transaction/TransactionRecipt";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import GetProfileInfo from "./pages/auth/GetProfileInfo";
import OtpVerification from "./pages/auth/OtpVerification";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import { Toaster, toast } from "react-hot-toast";
import UserEmail from "./pages/auth/UserEmail";
import ResetPassword from "./pages/auth/ResetPassword";

import { AuthProvider } from "./context/AuthContext";
import Cookies from "js-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NodificationPage from "./pages/Nodification_page/NodificationPage";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = () => {
    const token = Cookies.get("authToken"); // Retrieve token from cookies
    const user = Cookies.get("userId");
    const firstName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");

    // Ensure token, user, firstName, and lastName are all present
    return token && user && firstName && lastName;
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      toast.error(
        "Please log in and complete verification to access this page."
      );
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                zIndex: 20, // Ensures toast is above other elements
                marginTop: "100px", // Adds a margin of 100px from the top
              },
            }}
          />
          <Routes>
            {/* Public Routes */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="otp-verification" element={<OtpVerification />} />
            <Route path="profileInfo" element={<GetProfileInfo />} />
            <Route path='reset' element={<UserEmail />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            {/* Protected Routes under Master layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Master />
                </ProtectedRoute>
              }
            >
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="transactions"
                element={
                  <ProtectedRoute>
                    <Transaction />
                  </ProtectedRoute>
                }
              />
              <Route
                path="bill/payment"
                element={
                  <ProtectedRoute>
                    <Bill_payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="fund/wallet"
                element={
                  <ProtectedRoute>
                    <FundWallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="virtual/card"
                element={
                  <ProtectedRoute>
                    <VirtualCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="security"
                element={
                  <ProtectedRoute>
                    <Security />
                  </ProtectedRoute>
                }
              />
              <Route
                path="help-center"
                element={
                  <ProtectedRoute>
                    <HelpCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="privacy-policy"
                element={
                  <ProtectedRoute>
                    <Policy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notifications"
                element={
                  <ProtectedRoute>
                    <NodificationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notifications/settings"
                element={
                  <ProtectedRoute>
                    <Nodification />
                  </ProtectedRoute>
                }
              />

              {/* Route for betting category */}
              <Route
                path="/:categoryId"
                element={
                  <ProtectedRoute>
                    <Betting />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/:categoryId/:providerId"
                element={
                  <ProtectedRoute>
                    <EnterInfo />
                  </ProtectedRoute>
                }
              />

              <Route
                path="transactions/receipt"
                element={
                  <ProtectedRoute>
                    <TransactionRecipt />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
