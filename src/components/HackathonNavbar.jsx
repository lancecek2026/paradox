import { Menu, X, ChevronRight, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/logo.png';
import pdoxLogo from '../assets/pdox.png';

const HackathonNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 100) {
            setIsVisible(true);
          } else if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
            setIsVisible(currentScrollY < lastScrollY.current);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 80) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-[40] transition-all duration-300 ease-in-out bg-transparent ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Brand */}
          <Link to="/hackathon" className="flex items-center gap-3 no-underline group">
            <div className="relative flex items-center justify-center">
              <img src={heroImage} alt="Paradox Logo Text" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(255,51,0,0.6)]" />
              <div className="absolute h-[80%] w-auto flex items-center justify-center" style={{ left: '76%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src={pdoxLogo} alt="O" className="h-full w-auto animate-[spin_4s_linear_infinite]" />
              </div>
            </div>
          </Link>
          
          {/* Center: Hackathon Navigation Pill Container */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1 backdrop-blur-md">
            <a href="#" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Home</a>
            <a href="#about" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">About</a>
            <a href="#tracks" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Tracks</a>
            <a href="#process" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Details</a>
            <a href="#schedule" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Schedule</a>
            <a href="#prizes" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Prizes</a>
            <a href="#rules" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Rules</a>
            <a href="#contact" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all tracking-wide">Contact</a>
          </div>

          {/* Right: Back to Paradox Link (No Register Now Button) */}
          <div className="hidden lg:flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Paradox 2026</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 text-gray-300 hover:text-white transition-colors" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-[350px] bg-[var(--color-surface)] border-l border-white/10 flex flex-col px-6 py-8 animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center opacity-90">
                  <img src={heroImage} alt="Paradox Logo Text" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(255,51,0,0.6)]" />
                  <div className="absolute h-[80%] w-auto flex items-center justify-center" style={{ left: '76%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                    <img src={pdoxLogo} alt="O" className="h-full w-auto animate-[spin_4s_linear_infinite]" />
                  </div>
                </div>
                <span className="font-sans font-bold text-white text-sm tracking-wider uppercase">
                  PARADOX <span className="text-[var(--color-primary)]">HACK</span>
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[var(--color-primary)] transition-colors relative w-10 h-10 flex items-center justify-center opacity-80 hover:opacity-100"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6 relative z-10" strokeWidth={2} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <a href="#tracks" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">TRACKS</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="#details" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">DETAILS</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="#schedule" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">SCHEDULE</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="#prizes" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">PRIZES</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="#rules" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">RULES</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-base font-medium text-white tracking-wide">CONTACT</span>
                <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-3.5 group hover:border-[var(--color-primary)] transition-colors mt-2">
                <span className="font-sans text-base font-medium text-gray-300 group-hover:text-white tracking-wide">BACK TO PARADOX</span>
                <ArrowLeft className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
              </Link>
            </div>

            {/* Footer without Register button */}
            <div className="mt-auto pt-6 border-t border-white/5 text-center">
              <p className="font-sans text-xs text-white/50 tracking-widest uppercase">
                PARADOX HACKATHON 2026
              </p>
              <p className="text-[10px] text-gray-500 mt-1">
                College of Engineering Kidangoor
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default HackathonNavbar;
