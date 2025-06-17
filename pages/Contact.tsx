
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="space-y-4">
      <p>If you have any questions, feedback, or need support, please reach out to us using the form below.</p>
      
      {/* Paste your Google Forms iframe code here. Example structure:
      <iframe 
        src="YOUR_GOOGLE_FORM_EMBED_URL" 
        width="100%" 
        height="600" 
        frameBorder="0" 
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
      */}
      <div className="bg-slate-700 p-4 rounded-md text-center">
        <p className="text-slate-400">Google Forms iframe will be embedded here.</p>
        <p className="text-sm text-slate-500 mt-1">(Developer: Replace this div with your actual Google Forms iframe embed code)</p>
      </div>
       <p>Alternatively, you can email us at: <a href="mailto:support@urlanalyzer.example.com" className="text-sky-400 hover:underline">support@urlanalyzer.example.com</a> (this is a placeholder email).</p>
    </div>
  );
};

export default Contact;
