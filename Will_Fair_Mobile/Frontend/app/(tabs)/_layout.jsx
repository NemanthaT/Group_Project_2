import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  // NOTE: Back button handling is now managed by individual screens
  // using the useBackHandler hook. This prevents conflicts and allows
  // each screen to have custom back navigation behavior.

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