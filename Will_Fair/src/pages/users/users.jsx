import { Routes, Route } from 'react-router-dom';
import Donor from './Donor/Donor'
import Donee from './Donee/Donee'; 
import AuthManager from './AuthManager/AuthManager';

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
          <Route path="/authManager/*" element={<AuthManager />} />
        </Routes>
    );
}

export default Users;