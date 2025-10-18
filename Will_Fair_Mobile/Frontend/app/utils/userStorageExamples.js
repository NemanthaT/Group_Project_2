/**
 * USAGE EXAMPLES FOR USER STORAGE IN REACT NATIVE
 * 
 * This file demonstrates how to use the user storage system in your React Native app
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { saveUser, getUser, removeUser, isAuthenticated } from '../utils/userStorage';

// ============================================================================
// METHOD 1: Using the UserContext Hook (RECOMMENDED)
// ============================================================================

export const ExampleWithContext = () => {
  const { user, authenticated, loading, login, logout, updateUserData } = useUser();

  // Example: Login function
  const handleLogin = async () => {
    const userData = {
      userId: '123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'donor',
      userType: 'donors'
    };
    const token = 'your-auth-token-here';

    const result = await login(userData, token);
    if (result.success) {
      console.log('Login successful!');
    }
  };

  // Example: Logout function
  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('Logout successful!');
    }
  };

  // Example: Update user data
  const handleUpdate = async () => {
    const result = await updateUserData({ name: 'Jane Doe' });
    if (result.success) {
      console.log('User updated!');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      {authenticated ? (
        <>
          <Text>Welcome, {user?.name}!</Text>
          <Text>Email: {user?.email}</Text>
          <Text>Role: {user?.role}</Text>
          <Button title="Update Name" onPress={handleUpdate} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text>Please login</Text>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

// ============================================================================
// METHOD 2: Using the utility functions directly
// ============================================================================

export const ExampleWithDirectFunctions = () => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  // Load user data on component mount
  const loadUserData = async () => {
    const userData = await getUser();
    const authenticated = await isAuthenticated();
    
    setUser(userData);
    setIsAuth(authenticated);
  };

  // Example: Login
  const handleLogin = async () => {
    const userData = {
      userId: '123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'donor'
    };
    const token = 'your-auth-token-here';

    const result = await saveUser(userData, token);
    if (result.success) {
      setUser(userData);
      setIsAuth(true);
      console.log('Login successful!');
    }
  };

  // Example: Logout
  const handleLogout = async () => {
    const result = await removeUser();
    if (result.success) {
      setUser(null);
      setIsAuth(false);
      console.log('Logout successful!');
    }
  };

  return (
    <View>
      {isAuth ? (
        <>
          <Text>Welcome, {user?.name}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Text>Please login</Text>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

// ============================================================================
// EXAMPLE: Login Screen Integration
// ============================================================================

export const LoginScreenExample = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      // Call your API to authenticate
      const response = await fetch('http://your-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // Save user data and token
        await login(data.user, data.token);
        
        // Navigate to home screen
        // router.push('/home');
        console.log('Login successful!');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <View>
      {/* Your login form UI here */}
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

// ============================================================================
// EXAMPLE: Protected Route/Screen
// ============================================================================

export const ProtectedScreenExample = () => {
  const { user, authenticated, loading } = useUser();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !authenticated) {
      // router.push('/login');
      console.log('User not authenticated, redirect to login');
    }
  }, [authenticated, loading]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!authenticated) {
    return <Text>Redirecting to login...</Text>;
  }

  return (
    <View>
      <Text>Protected Content</Text>
      <Text>User ID: {user?.userId}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Role: {user?.role}</Text>
    </View>
  );
};
