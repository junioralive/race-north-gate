
import React from 'react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto max-w-[1100px] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our programs or the scholarship? Our team is here to assist you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-race-orange mr-4 shrink-0">
                  📞
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-gray-600">{CONTACT_INFO.phone}</p>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="text-race-orange font-medium text-sm hover:underline">Call Now</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-race-orange mr-4 shrink-0">
                  ✉️
                </div>
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-600">{CONTACT_INFO.email}</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-race-orange font-medium text-sm hover:underline">Email Us</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-race-orange mr-4 shrink-0">
                  📍
                </div>
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-gray-600 text-sm max-w-sm">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-80 md:h-auto rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe 
              title="RACE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.558368943714!2d77.63259837569103!3d13.127116811400628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae192539055555%3A0xe5a363f58e6584c!2sREVA%20University!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
