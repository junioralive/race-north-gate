
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import SpinWheel from './components/SpinWheel';
import AdminDashboard from './components/AdminDashboard';
import { AppState, UserSubmission } from './types';
import { CAMPAIGN } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppState>(AppState.LANDING);
  const [user, setUser] = useState<UserSubmission | null>(null);
  
  const storageKey = `race_spins_${CAMPAIGN.name}`;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') setCurrentStep(AppState.ADMIN);
      else if (currentStep === AppState.ADMIN) setCurrentStep(AppState.LANDING);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentStep]);

  const onFormSubmit = (data: UserSubmission) => {
    const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const existing = history.find((h: any) => h.email.toLowerCase() === data.email.toLowerCase());
    
    if (existing) {
      alert("This email has already participated in this campaign.");
      setUser(existing);
      setCurrentStep(AppState.RESULT);
      return;
    }

    setUser(data);
    setCurrentStep(AppState.SPIN);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetApp = () => {
    setUser(null);
    setCurrentStep(AppState.LANDING);
    // Force form reset by ensuring component remounts or just scrolling back
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const onSpinComplete = (rewardLabel: string, coupon: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, reward: rewardLabel, coupon: coupon };
    setUser(updatedUser);
    
    // IMMEDIATELY show result page to avoid perceived delay
    setCurrentStep(AppState.RESULT);
    
    // Background tasks
    const history = JSON.parse(localStorage.getItem(storageKey) || '[]');
    history.push(updatedUser);
    localStorage.setItem(storageKey, JSON.stringify(history));
    
    if (CAMPAIGN.googleSheetUrl) {
      const params = new URLSearchParams();
      params.append('name', updatedUser.name);
      params.append('email', updatedUser.email);
      params.append('phone', updatedUser.phone);
      params.append('company', updatedUser.company);
      params.append('reward', updatedUser.reward || '');
      params.append('coupon', updatedUser.coupon || '');
      params.append('timestamp', updatedUser.timestamp);

      fetch(CAMPAIGN.googleSheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      }).catch(err => console.error("Sync error:", err));
    }
  };

  if (currentStep === AppState.ADMIN) {
    return <AdminDashboard onClose={() => setCurrentStep(AppState.LANDING)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onCtaClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })} />
      
      <main className="flex-grow">
        {currentStep === AppState.LANDING && (
          <div className="animate-in fade-in duration-500">
            <Hero onStart={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })} />
            <div id="registration" className="py-20 bg-gray-50 border-t border-gray-100">
               <RegistrationForm onSubmit={onFormSubmit} />
            </div>
          </div>
        )}

        {currentStep === AppState.SPIN && user && (
          <div className="py-20 bg-white flex flex-col items-center justify-center min-h-[80vh] animate-in zoom-in-95 duration-200">
            <div className="max-w-2xl w-full px-4 text-center mb-12">
              <h2 className="text-4xl font-black mb-4 text-gray-900 tracking-tight">Best of Luck, {user.name.split(' ')[0]}!</h2>
              <p className="text-xl text-gray-600">Give it a spin to see your special RACE scholarship award.</p>
            </div>
            <SpinWheel onComplete={onSpinComplete} userEmail={user.email} />
          </div>
        )}

        {currentStep === AppState.RESULT && user && (
          <div className="py-20 bg-gray-50 flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full text-center border-t-[12px] border-race-orange">
              <div className="text-7xl mb-6">🏆</div>
              <h2 className="text-4xl font-black mb-2 text-gray-900">It's a Win!</h2>
              {(/\bhamper(s)?\b|\bgoodies\b|\bgifts?\b/i.test(user.reward || '')) ? (
                <p className="text-xl text-gray-600 mb-8">
                  You've won <span className="font-bold text-orange-600 underline decoration-2 underline-offset-4">{user.reward}</span>!
                </p>
              ) : (
                <p className="text-xl text-gray-600 mb-8">You've secured a <span className="font-bold text-orange-600 underline decoration-2 underline-offset-4">{user.reward}</span> discount!</p>
              )}
              
              {user.coupon ? (
                <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 mb-10">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-black">Your Exclusive Coupon</p>
                  <p className="text-3xl font-mono font-bold text-gray-800 tracking-widest">{user.coupon}</p>
                </div>
              ) : null}

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    if (user.coupon) navigator.clipboard.writeText(user.coupon);
                    alert("Thank you for participating!");
                  }}
                  className="w-full bg-race-orange text-white font-bold py-5 rounded-2xl hover:bg-orange-600 transition shadow-xl active:scale-95 text-lg"
                >
                  Thank You
                </button>
                <button 
                  onClick={resetApp}
                  className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl hover:bg-black transition shadow-xl active:scale-95 text-lg"
                >
                  Reset
                </button>
                <p className="pt-4 text-sm text-gray-500">
                  Ready to enroll? Visit <a href="https://race.reva.edu.in/" target="_blank" className="text-race-orange font-bold hover:underline">race.reva.edu.in</a>
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 text-center text-sm text-gray-400">
        <div className="container mx-auto px-4">
          <p className="font-medium tracking-tight">&copy; 2025 REVA Academy for Corporate Excellence (RACE). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
