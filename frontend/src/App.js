import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import authService from "./services/auth.service";

// Import components
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    authService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">Countries App</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className={`${
                      location.pathname === "/"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Home
                  </Link>

                  {currentUser && (
                    <Link
                      to="/profile"
                      className={`${
                        location.pathname === "/profile"
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Profile
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {currentUser ? (
                  <div className="flex items-center">
                    <span className="text-gray-300 mr-4">
                      {currentUser.username}
                    </span>
                    <button
                      onClick={logOut}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className={`${
                        location.pathname === "/login"
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className={`${
                        location.pathname === "/register"
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
