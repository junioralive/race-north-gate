
import React, { useState } from 'react';
import { UserSubmission } from '../types';

interface RegistrationFormProps {
  onSubmit: (data: UserSubmission) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserSubmission>({
    name: '',
    email: '',
    phone: '',
    company: '',
    timestamp: new Date().toISOString()
  });

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert("Please agree to receive information to proceed.");
      return;
    }
    setLoading(true);
    // Reduced simulated delay for better UX
    setTimeout(() => {
      onSubmit({ ...formData, timestamp: new Date().toISOString() });
      setLoading(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto max-w-[700px] px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="bg-race-orange py-10 px-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Register & Spin</h2>
          <p className="opacity-90 font-medium">Enter your details to unlock your exclusive discount</p>
        </div>

        <div className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input 
                  required
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-race-orange transition text-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-race-orange transition text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                <input 
                  required
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-race-orange transition text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                <input 
                  required
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Organization / Company Name"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-race-orange transition text-lg"
                />
              </div>
            </div>

            <div className="flex items-start mt-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex items-center h-5">
                <input 
                  id="consent"
                  type="checkbox" 
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-6 h-6 text-race-orange rounded-lg border-gray-300 focus:ring-race-orange cursor-pointer"
                />
              </div>
              <label htmlFor="consent" className="ml-4 text-sm text-gray-600 cursor-pointer select-none">
                I agree to receive information about RACE programs via email/WhatsApp. <span className="font-bold">One spin per participant allowed.</span>
              </label>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-race-orange text-white py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 transition shadow-xl flex items-center justify-center disabled:opacity-70 active:scale-[0.98] mt-4"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-6 w-6 mr-3 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                  Processing...
                </span>
              ) : "Register & Unlock Spin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;