import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

const BackButton = ({ 
  onPress, 
  style, 
  color = '#000', 
  size = 24, 
  navigateTo
}) => {
  const pathname = usePathname();

  // Handle hardware back button for this screen
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('🔙 Hardware back pressed on:', pathname);
      
      if (onPress) {
        onPress();
        return true; // Prevent default behavior
      }
      
      if (navigateTo) {
        router.push(navigateTo);
        return true;
      }
      
      // Default back behavior
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push('/firstpage');
      }
      return true;
    });

    return () => backHandler.remove();
  }, [onPress, navigateTo, pathname]);

  const handlePress = () => {
    console.log('👆 BackButton pressed programmatically on:', pathname);
    
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      router.push(navigateTo);
    } else {
      // Try to go back
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home
        router.push('/firstpage');
      }
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.backButton, style]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BackButton;