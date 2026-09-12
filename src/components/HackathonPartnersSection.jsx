import React from 'react';
import { motion } from 'framer-motion';

import l1 from '../assets/l1.png'; 

const hackathonPartners = [
  { id: 1, logo: l1, role: 'TITLE SPONSOR', name: 'AWIS WORLDWIDE KOTTAYAM' },
];

const HackathonPartnersSection = () => {
  return (
    <section className="w-full py-12 relative z-10 overflow-hidden bg-transparent">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[2px] bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              Hackathon Sponsors
            </span>
            <div className="w-12 h-[2px] bg-[var(--color-primary)]"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-sans font-black tracking-tight mb-4"
          >
            <span className="text-white">OUR </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              PARTNER
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-sans text-sm md:text-base max-w-2xl leading-relaxed"
          >
            Organisations powering the Paranova Hackathon 2026.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
          {hackathonPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group w-[75%] md:w-[45%] max-w-2xl"
            >
              {/* Logo Box with Gradient Border */}
              <div className="w-full aspect-[3/1] md:aspect-[5/1] rounded-2xl p-[1.5px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500 mb-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,51,0,0.3)]">
                <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo Image or Fallback */}
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <div className="relative z-10 text-gray-500 text-xs font-mono uppercase tracking-widest text-center px-4">
                      {partner.name} Logo
                    </div>
                  )}
                  
                  {/* Fallback text if logo fails to load */}
                  <div className="hidden relative z-10 text-gray-600 text-xs font-mono uppercase tracking-widest text-center px-4">
                    {partner.name}
                  </div>
                </div>
              </div>

              {/* Partner Info */}
              <div className="flex items-center justify-center w-full mb-3 gap-3">
                <div className="w-6 h-[1px] bg-[var(--color-primary)]/50"></div>
                <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shrink-0">
                  {partner.role}
                </span>
                <div className="w-6 h-[1px] bg-[var(--color-secondary)]/50"></div>
              </div>
              
              <h3 className="text-white text-base md:text-lg font-bold tracking-wide uppercase">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonPartnersSection;
