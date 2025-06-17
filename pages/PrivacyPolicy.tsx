import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="space-y-4 text-slate-300">
      <p className="mb-4">We respect your privacy. Below is an explanation of how this service handles your information.</p>
      
      <section>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">About Image Data</h3>
        <p>All background removal processing is completed entirely within your browser (client-side). Uploaded images are never sent to or stored on our servers.</p>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">About Ads</h3>
        <p>This service plans to use third-party advertising services such as Google AdSense. Ad providers may use cookies to display personalized ads based on user interests. For more information on disabling cookies and Google AdSense, please refer to the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Advertising – Policies & Terms – Google</a> page.</p>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">About Analytics Tools</h3>
        <p>This service may use Google Analytics to improve the service in the future. Google Analytics uses cookies to collect traffic data. This data is collected anonymously and does not identify individuals.</p>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">Disclaimer</h3>
        <p>We are not responsible for any damages arising from the use of this service. The contents of this service may be changed or terminated without notice.</p>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold text-sky-400 mb-2">Effective Date</h3>
        <p>June 19, 2025</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;