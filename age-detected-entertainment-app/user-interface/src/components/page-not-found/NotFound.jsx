import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen text-white bg-[#040724]">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl">Page Not Found</p>
        <p className="mt-4">
          The page you are looking for might be in another castle.
        </p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Go back Landing Page
        </Link>
      </div>
    </div>
  )
}

export default NotFound;