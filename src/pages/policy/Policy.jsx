import React from "react";

const Policy = () => {
  return (
    <div className="p-4 bg-gray-100">
        <div className=" bg-white rounded-lg shadow-lg p-8 w-full">
          <h1 className="font-bold text-2xl">PRIVACY POLICY</h1>
          <p>
            Welcome to Mx Bill Pay! We are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy Policy
            outlines how we collect, use, and safeguard your information when you
            use our bill payment app, accessible at
          </p>
          <h2 className="font-bold text-2xl mt-4">1. Information We Collect</h2>
          <p>
            We collect various types of information in connection with the services
            we provide, including:
          </p>
          <ol className=" pl-4" style={{ listStyleType: 'lower-alpha' }} >
            <li>
              <strong>Personal Information:</strong>
              <ul className="list-disc pl-4">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Payment information (e.g., credit card details, bank account information)</li>
                <li>Billing address</li>
              </ul>
            </li>
            <li>
              <strong>Non-Personal Information:</strong>
              <ul className="list-disc pl-4">
                <li>Device information (e.g., IP address, browser type, operating system)</li>
                <li>Usage data (e.g., pages visited, time spent on the app)</li>
              </ul>
            </li>
          </ol>
          <h2 className="font-bold mt-8 text-2xl">2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-8">
            <li>To process and manage bill payments</li>
            <li>To communicate with you regarding your account and transactions</li>
            <li>To provide customer support</li>
            <li>To improve our app and services</li>
            <li>To send you promotional materials and updates (with your consent)</li>
          </ul>
        </div>
    </div>
  );
};

export default Policy;
