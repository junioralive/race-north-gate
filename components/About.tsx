
import React from 'react';
import { CONTACT_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-[1100px] px-4">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-soft border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="text-race-orange font-bold text-sm tracking-widest uppercase mb-4 block">About RACE</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Excellence in Corporate Education</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              REVA Academy for Corporate Excellence (RACE) offers industry-aligned techno-functional programs specifically designed for working professionals. 
              Our blended learning model combines cutting-edge theory with intensive hands-on projects and direct industry mentorship.
            </p>
            <a 
              href={CONTACT_INFO.officialSite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-race-orange font-bold hover:underline"
            >
              Visit Official Site
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="bg-orange-50 p-6 rounded-2xl text-center">
               <p className="text-3xl font-black text-race-orange mb-1">5k+</p>
               <p className="text-xs text-gray-600 uppercase font-bold">Alumni</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl text-center">
               <p className="text-3xl font-black text-gray-800 mb-1">50+</p>
               <p className="text-xs text-gray-600 uppercase font-bold">Partners</p>
             </div>
             <div className="bg-gray-50 p-6 rounded-2xl text-center">
               <p className="text-3xl font-black text-gray-800 mb-1">100%</p>
               <p className="text-xs text-gray-600 uppercase font-bold">Hands-on</p>
             </div>
             <div className="bg-orange-50 p-6 rounded-2xl text-center">
               <p className="text-3xl font-black text-race-orange mb-1">Top</p>
               <p className="text-xs text-gray-600 uppercase font-bold">Ranked</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
