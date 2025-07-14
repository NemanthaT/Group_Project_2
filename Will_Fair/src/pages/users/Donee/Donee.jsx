import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './DoneeDashboard/DoneeDashboard';
import DoneeDonationsView from './ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import DonationForm from './DonationForms/DonationForm';

function Donee() {
    return (
        <Routes>
            <Route path="*" element={<DoneeDashboard />} />
            <Route path="/view" element={<DoneeDonationsView />} />
            <Route path="/form" element={<DonationForm />} />
        </Routes>
    );
}

export default Donee;