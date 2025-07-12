import { Routes, Route } from 'react-router-dom';
import DoneeDashboard from './DoneeDashboard/DoneeDashboard';
import DoneeDonationsView from './ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import Individual from './MonetaryFormIndividual/screens/Individual/Individual';

function Donee() {
    return (
        <Routes>
            <Route path="*" element={<DoneeDashboard />} />
            <Route path="/view" element={<DoneeDonationsView />} />
            <Route path="/monetary-form-individual" element={<Individual />} />
        </Routes>
    );
}

export default Donee;