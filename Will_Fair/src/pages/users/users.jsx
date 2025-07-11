import { Routes, Route } from 'react-router-dom';
import Donor from './Donor/Donor'
import DoneeDashboard from './Donee/DoneeDashboard/DoneeDashboard'; 

function Users() {
    return (
        <Routes>
          <Route path="/donor/*" element={<Donor />} />
          <Route path="/donee/*" element={<DoneeDashboard />} />
        </Routes>
    );
}

export default Users;