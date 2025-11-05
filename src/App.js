import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SecureEDiary from "./components/secureEDiary";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState(null);

  const handleLogin = (credentials) => {
    setUserCredentials(credentials);
    setIsAuthenticated(true);
  };

  // This should show the login page first
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Only show SecureEDiary after authentication
  return <SecureEDiary userCredentials={userCredentials} />;
}