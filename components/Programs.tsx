
import React from 'react';
import { PROGRAMS } from '../constants';

const Programs: React.FC = () => {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto max-w-[1100px] px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Programs</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose from our range of executive programs designed to accelerate your career in the most in-demand technologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((prog, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-left hover:shadow-xl hover:-translate-y-2 transition duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-2xl">
                {idx === 0 ? '🤖' : idx === 1 ? '🛡️' : idx === 2 ? '📊' : '☁️'}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{prog.title}</h3>
              <ul className="space-y-3">
                {prog.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 text-race-orange mt-0.5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
