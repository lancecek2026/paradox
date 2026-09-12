import { motion } from 'framer-motion';
import bgImage from '../assets/bg.png'; // Use bg.png since bg.jpg doesn't exist
import tLogo from '../assets/t.png';

const HeroSection = () => {
  return (
    <section 
      className="min-h-[90vh] md:min-h-screen flex items-center relative pt-24 pb-12 w-full px-5 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-80 "
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
      ></div>
      
      {/* Gradient to fade smoothly into the black site background below */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[var(--color-bg-dark)]/50 to-[var(--color-bg-dark)]"></div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-start">
        
        {/* Left-Aligned Block */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start text-left w-full max-w-4xl"
        >
          <div className="flex flex-col w-fit">
            {/* Department Logo */}
            <div className="-mb-0 sm:-mb-1 self-start relative z-10 cursor-pointer">
              <img 
                src={tLogo} 
                alt="Department Logo" 
                className="h-4 sm:h-5 md:h-7 w-auto object-contain transition-all duration-300 hover:scale-[1.15] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </div>

            {/* Main Headline: PARADOX 2026 */}
            <h1 className="tracking-tighter leading-[0.9] select-none text-left">
              <span className="block font-sans font-bold text-[3.75rem] sm:text-7xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] tracking-tighter text-white">
                Paradox
              </span>
              <span className="block mt-1 text-[3.25rem] sm:text-6xl md:text-6xl lg:text-[5.5rem] xl:text-[6rem] font-sans font-semibold text-[var(--color-primary)] tracking-tighter pr-4">
                2026
              </span>
            </h1>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col font-sans font-bold tracking-tighter uppercase select-none">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-none">
               15, 16
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-400 tracking-[0.2em] mt-1">
              September 2026
            </span>
          </div>

          <p className="mt-5 sm:mt-6 text-gray-300/90 text-base md:text-lg font-light tracking-wide max-w-xl leading-relaxed">
            Welcome to the annual flagship technical festival presented by the Department of Computer Science and Engineering. Step into the digital grid.
          </p>

          {/* Desktop Action Buttons (Unchanged original layout) */}
          <div className="hidden sm:flex flex-row items-center gap-4 w-auto mt-6 sm:mt-8">
            <a href="#events" className="bg-white hover:bg-gray-200 text-[#070707] transition-all rounded-full px-8 py-3.5 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 text-center flex justify-center items-center">
              Explore Events
            </a>
            <a href="#about" className="group flex justify-center items-center gap-3 px-8 py-3.5 rounded-full border border-white/20 hover:border-[var(--color-primary)] bg-white/5 hover:bg-[var(--color-primary)]/10 text-white transition-all text-sm font-medium tracking-wide hover:-translate-y-0.5">
              Learn More
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Mobile Action Buttons (Phone View) */}
          <div className="flex sm:hidden flex-row items-center gap-3 w-full mt-6">
            <a 
              href="#events" 
              className="flex-1 bg-white hover:bg-gray-200 text-[#070707] font-sans font-semibold text-sm py-3.5 px-4 rounded-xl transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] flex items-center justify-center text-center"
            >
              Explore Events
            </a>
            <a 
              href="#about" 
              className="flex-1 border border-white/20 hover:border-[var(--color-primary)] bg-white/5 hover:bg-[var(--color-primary)]/10 text-white font-sans font-semibold text-sm py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center text-center"
            >
              Learn More
            </a>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default HeroSection;
