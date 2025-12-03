import React, { useState } from 'react';
import { Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { SectionId } from '../types';

// Live Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFl9tsMmqeAb9m3we44TLRQt6VMrORAAzD1SgzGw4j77hnY9niIllLz1CZIPaFIw/exec";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    location: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Use URLSearchParams for application/x-www-form-urlencoded
      // This is more reliable for Google Apps Script e.parameter
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('company', formData.company);
      params.append('email', formData.email);
      params.append('location', formData.location);
      params.append('message', formData.message);

      // If the URL is still the placeholder, simulate success for demonstration
      if (GOOGLE_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT")) {
        console.warn("Using placeholder URL. Data not actually sent to Google Sheets.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', company: '', email: '', location: '', message: '' });
        return;
      }

      // Send data to Google Apps Script
      // mode: 'no-cors' is CRITICAL. It allows the request to be sent to a different domain (Google)
      // without reading the response (which would be blocked by browser security).
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params, 
        mode: 'no-cors' 
      });

      setStatus('success');
      setFormData({ name: '', company: '', email: '', location: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-nexus-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl font-bold mb-6">Ready to automate?</h2>
            <p className="text-gray-400 mb-12 text-lg">
              Book a discovery call. We'll outline exactly how much time and money our AI systems can save your business.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-nexus-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white font-medium">info.aithra@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-nexus-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">HQ</div>
                  <div className="text-white font-medium">Delhi, India</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-nexus-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <div className="text-white font-medium">+91 86013 71771</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
            {/* Success Overlay */}
            {status === 'success' && (
              <div className="absolute inset-0 bg-nexus-card/95 flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-center max-w-xs">
                  We've received your inquiry and will respond within 24 hours.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-nexus-accent hover:text-white text-sm font-medium"
                >
                  Send another message
                </button>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-nexus-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-gray-300">Company</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-nexus-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all" 
                    placeholder="Acme Inc." 
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-nexus-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-gray-300">Location</label>
                  <input 
                    type="text" 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-nexus-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all" 
                    placeholder="City, Country" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full bg-nexus-dark/50 border border-white/10 rounded-lg p-3 text-white focus:border-nexus-accent focus:ring-1 focus:ring-nexus-accent outline-none transition-all" 
                  placeholder="Tell us about your automation needs..."
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle className="w-4 h-4" />
                  <span>Something went wrong. Please try again.</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] animate-gradient-x text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;