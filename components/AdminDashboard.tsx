
import React, { useState } from 'react';
import { CAMPAIGN } from '../constants';
import { UserSubmission } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const storageKey = `race_spins_${CAMPAIGN.name}`;
  const history: UserSubmission[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CAMPAIGN.adminPassword) {
      setIsAuthorized(true);
    } else {
      alert("Invalid Password");
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Interest", "Reward", "Coupon", "Timestamp"];
    const rows = history.map(h => [
      h.name, h.email, h.phone, h.interest, h.reward, h.coupon, h.timestamp
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `race_leads_${CAMPAIGN.name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-race-orange"
              />
            </div>
            <button className="w-full bg-race-orange text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition">
              Access Dashboard
            </button>
            <button type="button" onClick={onClose} className="w-full text-gray-500 text-sm font-medium py-2">Back to Site</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 uppercase">RACE Admin Portal</h1>
            <p className="text-gray-500">Campaign: {CAMPAIGN.name}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={exportCSV}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700 transition flex items-center shadow-lg"
            >
              Export CSV
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Interest</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Reward</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Coupon</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-700 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.length > 0 ? history.map((h, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{h.name}</p>
                      <p className="text-xs text-gray-500">{h.company || 'No Company'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm">{h.email}</p>
                      <p className="text-xs text-gray-500">{h.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-100 text-race-orange text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                        {h.interest}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">{h.reward}</td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{h.coupon}</td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(h.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-gray-400">
                      No submissions found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
