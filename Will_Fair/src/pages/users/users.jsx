import { Routes, Route } from 'react-router-dom';
import Donor from './Donor/Donor'

function Users() {
    return (
        <Routes>
          <Route path="/donor/*" element={<Donor />} />
        </Routes>
    );
}

export default Users;