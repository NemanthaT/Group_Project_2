import { Routes, Route } from 'react-router-dom';
import Donor from './Donor/Donor'
import Donee from './Donee/Donee'; 
import AuthManager from './AuthManager/AuthManager';
import AdminDashboard from './SysAdmin/SysAdmin';
import WelfareDashboard from './RegionalManager/RegionalManager'

function Users() {
  const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
        window.location.href = '/';
        return null;
    }
    return (
        <Routes>
          <Route path="/donor/*" element={<Donor />} />
          <Route path="/donee/*" element={<Donee />} />
          <Route path="/auth_manager/*" element={<AuthManager />} />
          <Route path="/system_admin/*" element={<AdminDashboard />} />
          <Route path="/regional_manager/*" element={<WelfareDashboard />} />
        </Routes>
    );
}

export default Users;