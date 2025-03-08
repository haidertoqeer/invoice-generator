import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import App from './App';
import LandingPage from './component/LandingPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Navigation = () => {
  const location = useLocation();
  const isAppRoute = location.pathname === '/app';

  return (
    <nav className="p-4 bg-gray-50 flex justify-end">
      {isAppRoute ? (
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Home
        </Link>
      ) : (
        <Link to="/app" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
          Go to App
        </Link>
      )}
    </nav>
  );
};

root.render(
  <React.StrictMode>
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);