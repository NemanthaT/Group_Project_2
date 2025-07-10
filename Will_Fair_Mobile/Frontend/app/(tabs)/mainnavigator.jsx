import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens
import HomeScreen from '../../app/(tabs)/homescreen'; // Adjust path
// import ProgramScreen from './screens/ProgramScreen'; // Create this screen
// import MarketplaceScreen from './screens/MarketplaceScreen'; // Create this screen

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor: '#7B61FF',
          drawerLabelStyle: { fontSize: 15 },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        {/* <Drawer.Screen
          name="Program"
          component={ProgramScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="Marketplace"
          component={MarketplaceScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="Contact Us"
          component={ContactUsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="call-outline" size={size} color={color} />
            ),
          }}
        /> */}
        {/* <Drawer.Screen
          name="About Us"
          component={AboutUsScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="information-circle-outline" size={size} color={color} />
            ),
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
