import { Routes, Route } from 'react-router-dom';
import Dashboard from './DonorDashboard/Dashboard';
import MonetoryDonation from './Monetary/MonetaryDonation';

function Donor () {
    return (
        <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/monetory" element={<MonetoryDonation />} />
        </Routes>
    );
}

export default Donor;