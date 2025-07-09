// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#7B61FF',
//         tabBarInactiveTintColor: '#6B7280',
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: 'white',
//           borderTopWidth: 1,
//           borderTopColor: '#E5E7EB',
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }
// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
