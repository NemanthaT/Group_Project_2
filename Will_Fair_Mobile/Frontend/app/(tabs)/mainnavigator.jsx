// app/mainnavigator.js or similar
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

// Screens
import HomeScreen from '../(drawer)/homescreen'; // Make sure the path is correct

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // ❌ Hide default header (Fix applied here)
          drawerActiveTintColor: '#7B61FF',
          drawerLabelStyle: { fontSize: 15 },
        }}
      >
        <Drawer.Screen
          name="homescreen"
          component={HomeScreen}
          options={{
            drawerLabel: 'Home', // Optional: Rename label
          }}
        />
        {/* Add more screens here if needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
