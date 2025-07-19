import Forms from './Components/Forms';
import './DonationForms.css';

function DonationForm({user}) {
    return (
        <>
            <Forms user={user} />
        </>
    )
}

export default DonationForm;