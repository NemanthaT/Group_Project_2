import { Routes, Route } from 'react-router-dom';
import Donor from './Donor/Donor'
import Donee from './Donee/Donee'; 

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
        </Routes>
    );
}

export default Users;