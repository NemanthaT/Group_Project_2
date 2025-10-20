import { useEffect, useRef } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useRouter, useSegments, usePathname } from 'expo-router';

// Global navigation history stack
let navigationHistory = [];

/**
 * Custom hook to handle hardware back button press
 * Maintains navigation history and navigates to previous page
 * 
 * Usage:
 * useBackHandler(); // In any screen component
 */
export const useBackHandler = (customHandler = null) => {
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Track current page in navigation history
  useEffect(() => {
    const currentRoute = pathname;
    
    // Don't add to history on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (navigationHistory.length === 0) {
        navigationHistory.push(currentRoute);
        console.log('📝 Initial route:', currentRoute);
      }
      return;
    }
    
    // Add current route to history if it's different from the last one
    const lastRoute = navigationHistory[navigationHistory.length - 1];
    if (currentRoute !== lastRoute) {
      navigationHistory.push(currentRoute);
      console.log('📝 Navigation history:', navigationHistory);
    }
  }, [pathname]);

  useEffect(() => {
    const backAction = () => {
      const currentRoute = segments.join('/');
      console.log('🔙 [useBackHandler] Hardware back pressed');
      console.log('📍 Current route:', currentRoute);
      console.log('� Navigation history:', navigationHistory);
      
      // If custom handler is provided, use it
      if (customHandler) {
        console.log('🎯 Using custom handler');
        return customHandler();
      }

      // Remove current page from history
      if (navigationHistory.length > 0) {
        navigationHistory.pop(); // Remove current
      }
      
      // Get previous page
      const previousRoute = navigationHistory[navigationHistory.length - 1];
      console.log('⬅️ Previous route:', previousRoute);
      
      if (previousRoute && previousRoute !== pathname) {
        console.log('✅ Navigating to:', previousRoute);
        router.push(previousRoute);
        return true;
      }

      // If we're on a root screen (drawer screens), stay on it
      const rootScreens = [
        '/(drawer)/homescreen',
        '/(drawer)/request_view',
        '/(drawer)/events/events',
        '/(drawer)/mydonationreq',
        '/(drawer)/profile',
      ];

      if (rootScreens.some(screen => pathname.includes(screen))) {
        console.log('🏠 On root screen, staying here');
        return true;
      }

      // Fallback: try router.back()
      if (router.canGoBack()) {
        console.log('✅ Using router.back()');
        router.back();
        return true;
      }

      console.log('⚠️ Cannot navigate back');
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router, segments, customHandler, pathname]);
};

// Export function to clear history (useful for logout)
export const clearNavigationHistory = () => {
  navigationHistory = [];
  console.log('🧹 Navigation history cleared');
};

/**
 * Hook for screens that should confirm before going back
 * Useful for forms or pages with unsaved changes
 * 
 * @param {boolean} hasUnsavedChanges - Whether the form has unsaved changes
 * @param {string} message - Custom message to display (optional)
 */
export const useBackHandlerWithConfirmation = (hasUnsavedChanges = false, message = 'You have unsaved changes. Are you sure you want to go back?') => {
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Track current page in navigation history
  useEffect(() => {
    const currentRoute = pathname;
    
    // Don't add to history on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (navigationHistory.length === 0) {
        navigationHistory.push(currentRoute);
        console.log('📝 Initial route (with confirmation):', currentRoute);
      }
      return;
    }
    
    // Add current route to history if it's different from the last one
    const lastRoute = navigationHistory[navigationHistory.length - 1];
    if (currentRoute !== lastRoute) {
      navigationHistory.push(currentRoute);
      console.log('📝 Navigation history (with confirmation):', navigationHistory);
    }
  }, [pathname]);

  useEffect(() => {
    const backAction = () => {
      console.log('🔙 [useBackHandlerWithConfirmation] Hardware back pressed');
      console.log('💾 Has unsaved changes?', hasUnsavedChanges);
      console.log('📚 Navigation history:', navigationHistory);
      
      const handleBack = () => {
        // Remove current page from history
        if (navigationHistory.length > 0) {
          navigationHistory.pop();
        }
        
        // Get previous page
        const previousRoute = navigationHistory[navigationHistory.length - 1];
        console.log('⬅️ Previous route:', previousRoute);
        
        if (previousRoute && previousRoute !== pathname) {
          console.log('✅ Navigating to:', previousRoute);
          router.push(previousRoute);
        } else if (router.canGoBack()) {
          console.log('✅ Using router.back()');
          router.back();
        }
      };
      
      if (hasUnsavedChanges) {
        console.log('⚠️ Showing unsaved changes alert');
        Alert.alert(
          'Unsaved Changes',
          message,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('❌ User cancelled back'),
              style: 'cancel'
            },
            {
              text: 'Yes',
              onPress: () => {
                console.log('✅ User confirmed, going back');
                handleBack();
              }
            }
          ]
        );
        return true;
      }
      
      // If no unsaved changes, go back directly
      console.log('✅ No unsaved changes, going back');
      handleBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router, hasUnsavedChanges, message, pathname]);
};
