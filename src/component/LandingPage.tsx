import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col"> {/* Changed to flex-col */}
      <div className="container mx-auto px-10 flex-grow bg-gray-900 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 mb-4">
            Effortless Invoice Creation
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-8">
            Generate professional invoices in seconds. Streamline your billing process and get paid faster.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/app" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out">
              Create Invoice Now
            </Link>
          </div>
        </div>

        <div className="mt-12 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Fast & Easy</h3>
              <p className="text-gray-300">Create invoices with a user-friendly interface. No technical skills required.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Customizable</h3>
              <p className="text-gray-300">Add your logo, customize fields, and choose your preferred currency.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Download & Share</h3>
              <p className="text-gray-300">Download invoices as PDFs and share them instantly with your clients.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Invoice Generator. All rights reserved.</p>
          <div className="mt-2">
            <Link to="https://www.fiverr.com/users/toqeerhaider59" target='_blank' className="mx-2 hover:underline">Fiverr</Link>
            <Link to="https://www.upwork.com/freelancers/haidertouheed" target='_blank' className="mx-2 hover:underline">Upwork</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;