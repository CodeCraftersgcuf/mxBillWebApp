import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-700">
          Oops! Page Not Found
        </p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
