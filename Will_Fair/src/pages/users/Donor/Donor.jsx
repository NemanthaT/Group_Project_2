import { Routes, Route } from 'react-router-dom';
import Dashboard from './DonorDashboard/Dashboard';
import MonetoryDonation from './Monetary/MonetaryDonation';
import NonMonetary from './NonMonetary/NonMonetary';
import DonationView from './DonorDashboard/components/DonationView';
import MakeDonation from './DonorDashboard/components/MakeDonation';
import AllDonations from './DonorDashboard/components/AllDonations';

function Donor () {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    return (
        <Routes>
            <Route path="*" element={<Dashboard user={user} />} />
            <Route path="/monetory" element={<MonetoryDonation user={user} />} />
            <Route path="/nonMonetory" element={<NonMonetary user={user} />} />
            <Route path="/all-donations" element={<AllDonations user={user} />} />
            <Route path="/donations/:id/view" element={<DonationView user={user} />} />
            <Route path="/donations/:id/donate" element={<MakeDonation user={user} />} />
        </Routes>
    );
}

export default Donor;