import React from 'react';
import { createRoot } from 'react-dom/client';
import { IndividualDonation } from './components/IndividualDonation.js';

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(IndividualDonation));