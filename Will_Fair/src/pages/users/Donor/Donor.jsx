import { Routes, Route } from 'react-router-dom';
import Dashborad from './DonorDashboard/Dashboard';

function Donor () {
    return (
        <Routes>
            <Route path="*" element={<Dashborad />} />
        </Routes>
    );
}

export default Donor;