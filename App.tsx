import SpeedInsights from "@vercel/speed-insights"
import Analytics from "@vercel/analytics"
import React, { useState, useEffect, useCallback } from 'react';
import { QueryParam, ParsedUrlInfo } from './types';
import { PARAMETER_EXPLANATIONS } from './constants';
import Modal from './components/Modal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import ClipboardIcon from './components/icons/ClipboardIcon';

// Dictionary of common URL parameters and their explanations
const parameterDictionary: Record<string, string> = {
  // --- Google Analytics (UTM) ---
  'utm_source': 'The referrer or source of the traffic (e.g., google, newsletter, facebook).',
  'utm_medium': 'The marketing medium (e.g., cpc, email, social).',
  'utm_campaign': 'The specific product promotion or strategic campaign (e.g., summer_sale).',
  'utm_term': 'The keywords used for a paid search campaign.',
  'utm_content': 'Used to differentiate ads or links that point to the same URL (e.g., logolink, textlink).',

  // --- Paid Advertising ---
  'gclid': 'Google Click Identifier. A tracking parameter for Google Ads clicks.',
  'gclsrc': 'Indicates the source of the gclid, typically "aw.ds" for Google Ads.',
  'dclid': 'DoubleClick Click Identifier. A tracking parameter for the Google Display Network.',
  'msclkid': 'Microsoft Click Identifier. A tracking parameter for Microsoft (Bing) Advertising.',
  'fbclid': 'Facebook Click Identifier. A tracking parameter for Facebook Ads.',
  'twclid': 'Twitter Click Identifier. A tracking parameter for X (Twitter) Ads.',
  'ttclid': 'TikTok Click Identifier. A tracking parameter for TikTok Ads.',
  'li_fat_id': 'LinkedIn Follow Ad ID. A tracking parameter for LinkedIn Ads.',
  'yclid': 'Yahoo! Click Identifier. A tracking parameter for Yahoo! Japan Ads.',

  // --- Social Media & Referrals ---
  'ref': 'A common parameter indicating the referral source (e.g., ref=producthunt).',
  'source': 'Another common parameter indicating the traffic source.',
  'via': 'Indicates the user or channel through which the content was shared.',
  'igshid': 'Instagram Share ID. Tracks sharing of content within Instagram Stories.',

  // --- SEO & Site Search ---
  'q': 'Query. The search query a user entered.',
  'query': 'Query. A more descriptive version of "q".',
  's': 'Search. Another common parameter for a user\'s search term.',
  'keyword': 'The keyword used in a search.',

  // --- Affiliate Marketing ---
  'aff_id': 'Affiliate ID. Identifies the affiliate partner.',
  'affiliate_id': 'A more descriptive version of aff_id.',
  'sub_id': 'Sub-identifier used by affiliates for their own internal tracking.',
  'click_id': 'A unique ID for tracking a specific click in an affiliate campaign.',
  'partner_id': 'Identifies the distribution partner.',

  // --- General Site Functionality ---
  'id': 'A generic identifier for an item, such as a product or article ID.',
  'product_id': 'Specifically identifies a product.',
  'user_id': 'Specifically identifies a user.',
  'session_id': 'Identifies the current user session.',
  'lang': 'Language. Specifies the language of the content (e.g., en, ja).',
  'hl': 'Host Language. Another common parameter for specifying language, used by Google.',
};

const App: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>('');
  const [parsedResult, setParsedResult] = useState<ParsedUrlInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  const [copiedStatus, setCopiedStatus] = useState<Record<string, boolean>>({});
  const [jsonCopied, setJsonCopied] = useState<boolean>(false);

  const parseUrl = useCallback((input: string) => {
    if (!input.trim()) {
      setParsedResult(null);
      setError(null);
      return;
    }

    try {
      const url = new URL(input);
      const paramsList: QueryParam[] = [];
      url.searchParams.forEach((value, key) => {
        paramsList.push({
          key,
          value,
          explanation: parameterDictionary[key.toLowerCase()] || '-',
        });
      });

      setParsedResult({
        protocol: url.protocol,
        hostname: url.hostname,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params: paramsList,
      });
      setError(null);
    } catch (e) {
      setParsedResult(null);
      setError("Invalid URL format. Please enter a full URL (e.g., https://example.com).");
    }
  }, []);

  useEffect(() => {
    parseUrl(urlInput);
  }, [urlInput, parseUrl]);

  const handleUrlInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrlInput(event.target.value);
  };

  const handleClearInput = () => {
    setUrlInput('');
    setParsedResult(null);
    setError(null);
  };

  const copyToClipboard = async (text: string, id: string, isJsonExport: boolean = false) => {
    try {
      await navigator.clipboard.writeText(text);
      if (isJsonExport) {
        setJsonCopied(true);
        setTimeout(() => setJsonCopied(false), 2000);
      } else {
        setCopiedStatus((prev: Record<string, boolean>) => ({ ...prev, [id]: true }));
        setTimeout(() => setCopiedStatus((prev: Record<string, boolean>) => ({ ...prev, [id]: false })), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      if (isJsonExport) {
         // Optionally show error to user for JSON export
      } else {
        setCopiedStatus((prev: Record<string, boolean>) => ({ ...prev, [id]: false })); // Reset if error
      }
      alert("Failed to copy to clipboard. Your browser might not support this feature or permissions are denied.");
    }
  };

  const handleExportJson = () => {
    if (!parsedResult || parsedResult.params.length === 0) return;
    const jsonToExport = parsedResult.params.reduce((acc: Record<string, string>, param: QueryParam) => {
      acc[param.key] = param.value;
      return acc;
    }, {} as Record<string, string>);
    copyToClipboard(JSON.stringify(jsonToExport, null, 2), 'exportJson', true);
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
      <header className="py-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-400">URL Parameter Analyzer</h1>
        <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
          Instantly decode, parse, and understand any URL query string. All processing is done securely in your browser.
        </p>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Input Section */}
          <section className="md:w-1/2 flex flex-col space-y-4">
            <label htmlFor="urlInput" className="text-xl font-semibold text-slate-100">Enter URL</label>
            <textarea
              id="urlInput"
              value={urlInput}
              onChange={handleUrlInputChange}
              placeholder="Paste a full URL here... (e.g., https://www.example.com/path?param1=value1&utm_source=google)"
              className="w-full h-48 p-3 bg-slate-800 border border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-200 resize-y"
              aria-label="URL Input"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              onClick={handleClearInput}
              className="px-6 py-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-md transition-colors duration-150 ease-in-out self-start"
            >
              Clear
            </button>
          </section>

          {/* Output Section */}
          <section className="md:w-1/2 flex flex-col space-y-6">
            {parsedResult && (
              <>
                <div>
                  <h2 className="text-2xl font-semibold text-sky-400 mb-3">Base URL Information</h2>
                  <div className="bg-slate-800 p-4 rounded-md shadow">
                    <p><strong>Protocol:</strong> <span className="text-slate-300">{parsedResult.protocol}</span></p>
                    <p><strong>Hostname:</strong> <span className="text-slate-300">{parsedResult.hostname}</span></p>
                    <p><strong>Pathname:</strong> <span className="text-slate-300">{parsedResult.pathname || "/"}</span></p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-semibold text-sky-400">Query Parameters</h2>
                    {parsedResult.params.length > 0 && (
                       <button
                        onClick={handleExportJson}
                        className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md transition-colors text-sm flex items-center gap-2"
                      >
                        {jsonCopied ? "Copied!" : "Export as JSON"}
                        {!jsonCopied && <ClipboardIcon className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  {parsedResult.params.length > 0 ? (
                    <div className="overflow-x-auto bg-slate-800 rounded-md shadow">
                      <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-700">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Key</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Value</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Explanation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {parsedResult.params.map((param: QueryParam, index: number) => (
                            <tr key={`${param.key}-${index}`} className={`hover:bg-slate-700/50 transition-colors ${param.key.startsWith('utm_') ? 'bg-slate-700/30' : ''}`}>
                              <td className="px-4 py-3 text-sm text-slate-200 break-all font-bold">{param.key}</td>
                              <td className="px-4 py-3 text-sm text-slate-300 break-all">
                                <div className="flex items-center justify-between gap-2">
                                  <span>{param.value}</span>
                                  <button
                                    onClick={() => copyToClipboard(param.value, `${param.key}-${index}`)}
                                    title={`Copy value of ${param.key}`}
                                    className="p-1 text-slate-400 hover:text-sky-400 transition-colors"
                                  >
                                    {copiedStatus[`${param.key}-${index}`] ? 
                                      <span className="text-xs text-sky-400">Copied!</span> : 
                                      <ClipboardIcon className="w-4 h-4" />
                                    }
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-slate-400">{param.explanation}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-slate-400 bg-slate-800 p-4 rounded-md shadow">No query parameters found in the URL.</p>
                  )}
                </div>
              </>
            )}
            {!urlInput.trim() && !parsedResult && (
                 <div className="text-center text-slate-500 pt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <p className="mt-2 text-lg">Parsed URL details will appear here.</p>
                 </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-6 px-4 text-center border-t border-slate-700">
        <div className="space-x-4 mb-2">
          <button onClick={() => setShowPrivacyModal(true)} className="text-slate-400 hover:text-sky-400 transition-colors">Privacy Policy</button>
          <button onClick={() => setShowContactModal(true)} className="text-slate-400 hover:text-sky-400 transition-colors">Contact</button>
        </div>
        <p className="text-sm text-slate-500">&copy; {currentYear} URL Parameter Analyzer. All rights reserved.</p>
      </footer>

      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Privacy Policy">
        <PrivacyPolicy />
      </Modal>
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Us">
        <Contact />
      </Modal>

      {/* Vercel Analytics and Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
