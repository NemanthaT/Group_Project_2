import DoneeDonationsView from './Donee/ViewDonations/screens/DoneeDonationsView/DoneeDonationsView';
import { Routes, Route } from 'react-router-dom';
import IndividualDonation from './Donee/DoneeIndividualDonationView/components/IndividualDonation';
import Donor from './Donor/Donor'

function Users() {
    return (
        <Routes>
          <Route path="*" element={<Donor />} />
        </Routes>
    );
}

export default Users;