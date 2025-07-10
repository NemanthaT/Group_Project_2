import { Routes, Route } from 'react-router-dom';
import Dashboard from './DonorDashboard/Dashboard';
import MonetoryDonation from './Monetary/MonetaryDonation';
import NonMonetary from './NonMonetary/NonMonetary';

function Donor () {
    return (
        <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="/monetory" element={<MonetoryDonation />} />
            <Route path="/nonMonetory" element={<NonMonetary />} />
        </Routes>
    );
}

export default Donor;