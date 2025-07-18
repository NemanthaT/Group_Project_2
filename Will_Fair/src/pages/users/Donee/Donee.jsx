import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './DoneeDashboard/DoneeDashboard';
import DoneeDonationsView from './ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import DonationForm from './DonationForms/DonationForm';


function Donee() {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    return (
        <Routes>
            <Route path="*" element={<DoneeDashboard user={user} />} />
            <Route path="/view" element={<DoneeDonationsView user={user} />} />
            <Route path="/form" element={<DonationForm user={user} />} />
        </Routes>
    );
}

export default Donee;