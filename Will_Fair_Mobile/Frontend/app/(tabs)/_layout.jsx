import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { useCallback } from 'react';
import { router } from 'expo-router';

export default function Layout() {
  // Add global back button handler here
  useFocusEffect(
    useCallback(() => {
      console.log('📱 Setting up back handler in tabs layout');
      
      const onBackPress = () => {
        const currentRoute = router.pathname;
        console.log('🔙 Back pressed! Current route:', currentRoute);
        
        if (currentRoute === '/firstpage') {
          // If on first page, show exit confirmation
          Alert.alert(
            'Exit App',
            'Do you want to exit the app?',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Exit', onPress: () => BackHandler.exitApp() }
            ]
          );
          return true;
        } else {
          // For other screens, go back to firstpage
          console.log('🏠 Navigating back to firstpage');
          router.push('/firstpage');
          return true;
        }
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
      return () => {
        console.log('🧹 Cleaning up back handler');
        subscription?.remove();
      };
    }, [])
  );

  return (
    <Stack 
      screenOptions={{ headerShown: false }}
      initialRouteName="firstpage"
    >
      <Stack.Screen name="firstpage" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="donee_login" options={{ headerShown: false }} />
      <Stack.Screen name="donee_ind_reg" options={{ headerShown: false }} />
      <Stack.Screen name="donee_rep_reg" options={{ headerShown: false }} />
      <Stack.Screen name="donor_reg" options={{ headerShown: false }} />
      <Stack.Screen name="donation_payment" options={{ headerShown: false }} />
      <Stack.Screen name="mainnavigator" options={{ headerShown: false }} />
      <Stack.Screen name="homescreen" options={{ headerShown: false }} />
      <Stack.Screen name="donationform" options={{ headerShown: false }} />
      <Stack.Screen name="monetory" options={{ headerShown: false }} />
      <Stack.Screen name="nonmonetory" options={{ headerShown: false }} />
      <Stack.Screen name="mydonationreq" options={{ headerShown: false }} />
      <Stack.Screen name="mydonationreq_ind" options={{ headerShown: false }} />
      <Stack.Screen name="marketplace" options={{ headerShown: false }} />
      <Stack.Screen name="ind_product" options={{ headerShown: false }} />
      <Stack.Screen name="volunteerprograms" options={{ headerShown: false }} />
      <Stack.Screen name="program" options={{ headerShown: false }} />
    </Stack>
  );
}