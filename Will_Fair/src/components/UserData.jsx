import { useEffect } from 'react';

const UserData = ({ children }) => {
  const saveUser = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
  };

  const getUser = () => {
    const user = localStorage.getItem('userData');
    return user ? JSON.parse(user) : null;
  };

  const removeUser = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  return children({ saveUser, getUser, removeUser, isAuthenticated });
};

export default UserData;