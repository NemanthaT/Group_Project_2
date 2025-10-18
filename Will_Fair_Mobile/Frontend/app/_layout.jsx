import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { useCallback } from 'react';
import { router } from 'expo-router';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout() {

  return (
    <UserProvider>
      {/* Ensure the StatusBar is styled correctly */}
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      </Stack>
    </UserProvider>
  );
}