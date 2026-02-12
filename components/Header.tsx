
import React from 'react';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto max-w-[1100px] px-4 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="https://race.reva.edu.in/wp-content/uploads/RACE-REVA-University-logo.svg" 
            alt="RACE - REVA University" 
            className="h-12 md:h-14 w-auto"
          />
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={onCtaClick}
            className="bg-race-orange text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition shadow-md active:scale-95"
          >
            Register & Spin
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
