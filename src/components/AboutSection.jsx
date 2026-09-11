import React from 'react';
import { motion } from 'framer-motion';
import aboutPoster from '../assets/about-poster.jpeg';
import e1 from '../assets/e1.jpeg';
import e2 from '../assets/e2.jpeg';
import e3 from '../assets/e3.jpeg';
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpeg';
import p3 from '../assets/p3.jpeg';
const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative w-full scroll-mt-20 overflow-hidden bg-[var(--color-bg-dark)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top Header Row (matches "Meet The Minds...") */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
            <p className="text-gray-400 text-xs tracking-wider uppercase">About Fest</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans text-white tracking-tight">
            Welcome To <br />
            <span className="text-gray-400">Paradox '26</span>
          </h2>
        </div>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Col: Big Graphic / Poster */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 w-full relative flex items-center justify-center group"
          >
            {/* Glowing ambient background based on image */}
            <div 
              className="absolute inset-4 opacity-30 blur-[40px] md:blur-[50px] scale-110 group-hover:opacity-50 transition-opacity duration-700" 
              style={{ backgroundImage: `url(${aboutPoster})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            ></div>

            <img 
              src={aboutPoster} 
              alt="Paradox 26 Tech Fest Poster" 
              className="relative z-10 w-full h-auto max-w-md lg:max-w-full object-cover rounded-[32px] border border-white/5 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-700"
            />
          </motion.div>

          {/* Right Col: Text & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full pt-8 lg:pt-0 lg:pl-12">
            
            {/* Text description */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg leading-relaxed font-sans text-gray-300 font-light mb-12 max-w-2xl"
            >
              <p className="mb-6">
                Paradox '26 is the annual flagship technical fest organized by the Department of Computer Science and Engineering at the College of Engineering Kidangoor.
              </p>
              <p>
                We bring together designers, strategists, and makers to craft bold, thoughtful digital experiences. Whether you're a code warrior or tech explorer, join us for an immersive journey into tomorrow's grid.
              </p>
            </motion.div>

            {/* Micro stats / icons (matches "Over 150 Fields...") */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-6 mb-16 border-b border-white/5 pb-8"
            >
               <div className="flex -space-x-2">
                 <img src={e1} alt="Domain 1" className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-dark)] object-cover" />
                 <img src={e2} alt="Domain 2" className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-dark)] object-cover" />
                 <img src={e3} alt="Domain 3" className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-dark)] object-cover" />
               </div>
               <div className="text-xs text-gray-400">
                 Over <strong className="text-white">20+ Events</strong><br/>
                 Multiple Domains
               </div>
            </motion.div>

            {/* Stat Cards Row */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Dark Card */}
              <div className="flux-card p-6 md:p-8 flex flex-col justify-between h-[220px]">
                <div>
                  <div className="text-4xl font-sans font-light text-white mb-2">150+</div>
                  <div className="text-xs text-gray-500">Expected Participants</div>
                </div>
                <div className="flex gap-4 opacity-80 mt-1">
                   <img src={p1} alt="participant" className="w-6 h-6 rounded-md object-cover shadow-sm" />
                   <img src={p2} alt="participant" className="w-6 h-6 rounded-md object-cover shadow-sm" />
                   <img src={p3} alt="participant" className="w-6 h-6 rounded-md object-cover shadow-sm" />
                </div>
                <a href="#events" className="mt-4 bg-[var(--color-primary)] text-white text-xs font-medium py-3 px-6 rounded-full text-center hover:bg-[var(--color-secondary)] transition-colors">
                  View Events
                </a>
              </div>

              {/* Red Card */}
              <div className="rounded-[24px] bg-gradient-to-br from-[#FF2A00] to-[#CC1100] p-6 md:p-8 flex flex-col justify-between h-[220px] relative overflow-hidden shadow-[0_15px_30px_rgba(255,51,0,0.2)]">
                {/* Internal Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 blur-2xl rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest border border-white/20 px-2 py-1 rounded">Hackathon</div>
                    <div className="text-[10px] text-white/80">17/09</div>
                  </div>
                  <div className="text-5xl font-sans font-bold text-white mb-2">8h</div>
                  <div className="text-xs text-white/90 leading-relaxed">
                    Non-stop coding and innovation in our flagship hackathon event.
                  </div>
                </div>
              </div>

            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
