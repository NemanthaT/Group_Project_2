import DoneeDonationsView from './Donee/ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import { Routes, Route } from 'react-router-dom';
import IndividualDonation from './Donee/DoneeIndividualDonationView/components/IndividualDonation';

function Users() {
    return (
        <Routes>
          <Route path="" element={<DoneeDonationsView />} />
          <Route path="view" element={<IndividualDonation/>} />
        </Routes>
    );
}

export default Users;