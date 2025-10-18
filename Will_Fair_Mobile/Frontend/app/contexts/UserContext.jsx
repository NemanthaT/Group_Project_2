import React, { createContext, useState, useEffect, useContext } from 'react';
import { saveUser, getUser, removeUser, isAuthenticated, updateUser } from '../utils/userStorage';

// Create the User Context
const UserContext = createContext();

/**
 * Custom hook to use the User Context
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

/**
 * User Provider Component
 * Manages user state and provides authentication functions
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, []);

  /**
   * Load user data from storage
   */
  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await getUser();
      const isAuth = await isAuthenticated();
      
      setUser(userData);
      setAuthenticated(isAuth);
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user - save data and update state
   */
  const login = async (userData, token) => {
    try {
      const result = await saveUser(userData, token);
      if (result.success) {
        setUser(userData);
        setAuthenticated(true);
        return { success: true };
      }
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Logout user - clear data and reset state
   */
  const logout = async () => {
    try {
      const result = await removeUser();
      setUser(null);
      setAuthenticated(false);
      return result;
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Update user data
   */
  const updateUserData = async (updates) => {
    try {
      const result = await updateUser(updates);
      if (result.success) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Refresh user data from storage
   */
  const refreshUser = async () => {
    await loadUser();
  };

  const value = {
    user,
    authenticated,
    loading,
    login,
    logout,
    updateUserData,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
