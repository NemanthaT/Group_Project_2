import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/customerdrawer'; // Adjust the import path as necessary
export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 250, // control drawer width
          backgroundColor: 'transparent',
        },
        overlayColor: 'transparent', // optional: no dim background
      }}
    />
  );
}
