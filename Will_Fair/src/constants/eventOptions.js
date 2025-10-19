export const EVENT_OPTIONS = {
  type: [
    { value: 'environment', label: 'Environment' },
    { value: 'teaching', label: 'Teaching' },
    { value: 'caregiving', label: 'Caregiving' },
    { value: 'construction', label: 'Construction' },
    { value: 'admin', label: 'Administration' }
  ],
  
  commitment: [
    { value: 'one-time', label: 'One-time' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'flexible', label: 'Flexible' }
  ],
  
  location: [
    { value: 'Colombo', label: 'Colombo' },
    { value: 'Galle', label: 'Galle' },
    { value: 'Kandy', label: 'Kandy' },
    { value: 'Matara', label: 'Matara' },
    { value: 'Yala', label: 'Yala' }
  ],
  
  skills: [
    { value: 'teaching', label: 'Teaching' },
    { value: 'caregiving', label: 'Care-Giving' },
    { value: 'manual', label: 'Manual Labour' },
    { value: 'technical', label: 'Technical' },
    { value: 'none', label: 'No Experience' }
  ],

  // Filter-specific options
  sort: [
    { value: '', label: 'Sort by' },
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'urgent', label: 'Most Urgent' }
  ]
};

// Helper to add placeholder option
export const withPlaceholder = (options, placeholder) => [
  { value: '', label: placeholder },
  ...options
];