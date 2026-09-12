import React from 'react';
import { motion } from 'framer-motion';
import l1 from '../assets/l1.png';
import l2 from '../assets/l2.png';
import l3 from '../assets/l3.png';
import l4 from '../assets/l4.jpeg';
import l5 from '../assets/l5.png';
import l6 from '../assets/l6.png';
import l7 from '../assets/l7.png';
import l8 from '../assets/l8.png';

const otherSponsors = [
  { id: 3, logo: l2, role: 'GAMING PARTNER', name: 'APX KOTTAYAM' },
  { id: 5, logo: l6, role: 'TECH PARTNER', name: 'KERAKERALA' }
];

const partners = [
  { id: 7, logo: l7, role: 'TECHNICAL PARTNER', name: 'IEEE CEKGR' },
  { id: 8, logo: l8, role: 'ECOSYSTEM PARTNER', name: 'IEDC CEKGR' }
];

const titleSponsor = { id: 'title', logo: l5, role: 'TITLE SPONSOR', name: 'ZENTRONIQ' };
const coSponsor = { id: 'co', logo: l3, role: 'CO-SPONSOR', name: 'CAN APPROVE' };

const PartnersSection = () => {
  return (
    <section className="w-full py-24 relative z-10 overflow-hidden bg-transparent">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-sans font-black tracking-tight mb-6"
          >
            <span className="text-white">OUR </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
              PARTNERS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-sans text-sm md:text-base max-w-2xl leading-relaxed mb-12"
          >
            Backing PARADOX 26 directly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[2px] bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              Sponsors
            </span>
          </motion.div>
        </div>

        {/* Title Sponsor (Wide Banner) */}
        <div className="mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group w-[75%] md:w-[45%] max-w-2xl"
          >
            <div className="w-full aspect-[3/1] md:aspect-[5/1] rounded-2xl p-[1.5px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500 mb-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,51,0,0.3)]">
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={titleSponsor.logo} 
                  alt={titleSponsor.name}
                  className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden relative z-10 text-gray-600 text-xs font-mono">
                  [{titleSponsor.logo}]
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mb-3 gap-3">
              <div className="w-6 h-[1px] bg-[var(--color-primary)]/50"></div>
              <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shrink-0">
                {titleSponsor.role}
              </span>
              <div className="w-6 h-[1px] bg-[var(--color-secondary)]/50 hidden md:block"></div>
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide uppercase">
              {titleSponsor.name}
            </h3>
          </motion.div>
        </div>

        {/* Co-Sponsor (Single Row) */}
        <div className="mb-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center group w-56 sm:w-64"
          >
            {/* Logo Box with Gradient Border */}
            <div className="w-full aspect-[4/3] rounded-2xl p-[1.5px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500 mb-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,51,0,0.3)]">
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center p-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={coSponsor.logo} 
                  alt={coSponsor.name}
                  className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden relative z-10 text-gray-600 text-xs font-mono">
                  [{coSponsor.logo}]
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mb-3 gap-3">
              <div className="w-6 h-[1px] bg-[var(--color-primary)]/50"></div>
              <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shrink-0">
                {coSponsor.role}
              </span>
              <div className="w-6 h-[1px] bg-[var(--color-secondary)]/50 hidden md:block"></div>
            </div>
            
            <h3 className="text-white text-base md:text-lg font-bold tracking-wide uppercase">
              {coSponsor.name}
            </h3>
          </motion.div>
        </div>

        {/* Other Sponsors (APX & KERAKERALA) */}
        <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6 lg:gap-8 justify-center items-center justify-items-center max-w-2xl mx-auto">
          {otherSponsors.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group w-48 sm:w-56"
            >
              <div className="w-full aspect-[4/3] rounded-2xl p-[1.5px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500 mb-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,51,0,0.3)]">
                <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center p-8 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="hidden relative z-10 text-gray-600 text-xs font-mono">
                    [{partner.logo}]
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-full mb-3 gap-3">
                <div className="w-6 h-[1px] bg-[var(--color-primary)]/50"></div>
                <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shrink-0">
                  {partner.role}
                </span>
                <div className="w-6 h-[1px] bg-[var(--color-secondary)]/50 hidden md:block"></div>
              </div>
              
              <h3 className="text-white text-base md:text-lg font-bold tracking-wide uppercase">
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Partners Sub Head */}
        <div className="mb-8 mt-4 flex items-center justify-start w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[2px] bg-[var(--color-primary)]"></div>
            <span className="text-[var(--color-primary)] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              PARTNERS
            </span>
          </motion.div>
        </div>

        {/* Other Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-6 lg:gap-8 justify-center items-center justify-items-center max-w-2xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group w-48 sm:w-56"
            >
              {/* Logo Box with Gradient Border */}
              <div className="w-full aspect-[4/3] rounded-2xl p-[1.5px] bg-gradient-to-br from-white/20 via-white/5 to-white/20 group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-secondary)] transition-all duration-500 mb-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,51,0,0.3)]">
                <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center p-8 overflow-hidden relative">
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Logo Image */}
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  
                  {/* Fallback text if logo missing */}
                  <div className="hidden relative z-10 text-gray-600 text-xs font-mono">
                    [{partner.logo}]
                  </div>
                </div>
              </div>

              {/* Partner Info */}
              <div className="flex items-center justify-center w-full mb-3 gap-3">
                <div className="w-6 h-[1px] bg-[var(--color-primary)]/50"></div>
                <span className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shrink-0">
                  {partner.role}
                </span>
                <div className="w-6 h-[1px] bg-[var(--color-secondary)]/50 hidden md:block"></div>
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

export default PartnersSection;
