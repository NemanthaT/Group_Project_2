import { Routes, Route } from 'react-router-dom';
import Dashboard from './DonorDashboard/Dashboard';
import MonetoryDonation from './Monetary/MonetaryDonation';
import NonMonetary from './NonMonetary/NonMonetary';

function Donor () {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    return (
        <Routes>
            <Route path="*" element={<Dashboard user={user} />} />
            <Route path="/monetory" element={<MonetoryDonation user={user} />} />
            <Route path="/nonMonetory" element={<NonMonetary user={user} />} />
        </Routes>
    );
}

export default Donor;