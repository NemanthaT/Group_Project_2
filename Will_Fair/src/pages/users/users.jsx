import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './Donee/DoneeDashboard/DoneeDashboard'; 

function Users() {
    return (
        <Routes>
          <Route path="/donee/*" element={<DoneeDashboard />} />

        </Routes>
    );
}

export default Users;