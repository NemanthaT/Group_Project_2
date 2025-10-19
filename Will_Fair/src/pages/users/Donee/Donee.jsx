import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './DoneeDashboard/DoneeDashboard';
import DoneeDonationsView from './ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import DonationForm from './DonationForms/DonationForm';
import DoneeDonationDetail from './ViewDonations/screens/DoneeDonationDetail.jsx';


function Donee() {
    const user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    return (
        <Routes>
            <Route path="*" element={<DoneeDashboard user={user} />} />
            <Route path="/view" element={<DoneeDonationsView user={user} />} />
            <Route path="/form" element={<DonationForm user={user} />} />
            <Route path="/donation/:id/view" element={<DoneeDonationDetail mode="view" />} />
            <Route path="/donation/:id/edit" element={<DoneeDonationDetail mode="edit" />} />

        </Routes>
    );
}

export default Donee;