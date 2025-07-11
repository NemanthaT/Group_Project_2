import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './DoneeDashboard/DoneeDashboard';
import DoneeDonationsView from './ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';

function Donee() {
    return (
        <Routes>
            <Route path="*" element={<DoneeDashboard />} />
            <Route path="/view" element={<DoneeDonationsView />} />
        </Routes>
    );
}

export default Donee;