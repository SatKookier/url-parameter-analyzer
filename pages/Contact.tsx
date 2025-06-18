import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-4">
      <p>If you have any questions, feedback, or need support, please reach out to us using the form below.</p>
      
      <iframe 
        src="https://docs.google.com/forms/d/e/1FAIpQLScc6qfgLR1pVv8MCVPtBKWh1QkD7fkYxvwbid3zx_hNnOZQhA/viewform?embedded=true" 
        width="100%" 
        height="860" 
        frameBorder="0" 
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
    </div>
  );
};

export default Contact;
