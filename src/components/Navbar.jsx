import { Menu, X, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroImage from '../assets/logo.png';
import pdoxLogo from '../assets/pdox.png';

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = React.useRef(0);
  const ticking = React.useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY < 100) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);
            if (Math.abs(currentScrollY - lastScrollY.current) > 8) {
              setIsVisible(currentScrollY < lastScrollY.current);
            }
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
          <Link to="/" className="flex items-center gap-3 no-underline relative group">
            <div className="relative flex items-center justify-center">
              <img src={heroImage} alt="Paradox Logo Text" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(255,51,0,0.6)]" />
              <div className="absolute h-[80%] w-auto flex items-center justify-center" style={{ left: '76%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src={pdoxLogo} alt="O" className="h-full w-auto animate-[spin_4s_linear_infinite]" />
              </div>
            </div>
          </Link>
          
          {/* Center: Navigation Pill Container */}
          <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-xl p-1.5 gap-1 backdrop-blur-md">
            <Link to="/" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-5 py-2 rounded-lg transition-all tracking-wide">Home</Link>
            <a href="/#about" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-5 py-2 rounded-lg transition-all tracking-wide">About</a>
            <a href="/#events" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-5 py-2 rounded-lg transition-all tracking-wide">Events</a>
            <Link 
              to="/hackathon" 
              className={`font-sans font-medium text-[13px] px-5 py-2 rounded-lg transition-all tracking-wide flex items-center gap-2 ${
                pathname === '/hackathon'
                  ? 'text-white bg-white/15 shadow-[0_0_12px_rgba(255,51,0,0.3)] border border-[var(--color-primary)]/40 font-semibold' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
              Hackathon
            </Link>
            <a href="/#schedule" className="font-sans font-medium text-[13px] text-gray-300 hover:text-white hover:bg-white/5 px-5 py-2 rounded-lg transition-all tracking-wide">Schedule</a>
          </div>

          {/* Right: Action Button */}
          <div className="hidden lg:flex">
            <a href="/#events" className="bg-white hover:bg-gray-100 text-[#070707] font-sans font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] inline-block">
              Register Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsOpen(true)}
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
            <div className="flex items-center justify-between mb-12">
              <div className="relative flex items-center justify-center opacity-90">
                <img src={heroImage} alt="Paradox Logo Text" className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(255,51,0,0.6)]" />
                <div className="absolute h-[80%] w-auto flex items-center justify-center" style={{ left: '76%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <img src={pdoxLogo} alt="O" className="h-full w-auto animate-[spin_4s_linear_infinite]" />
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-[var(--color-primary)] transition-colors relative w-10 h-10 flex items-center justify-center opacity-80 hover:opacity-100"
              >
                <X className="w-6 h-6 relative z-10" strokeWidth={2} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-4 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-lg font-medium text-white tracking-wide">HOME</span>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </Link>
              <a href="/#about" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-4 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-lg font-medium text-white tracking-wide">ABOUT</span>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <a href="/#events" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-4 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-lg font-medium text-white tracking-wide">EVENTS</span>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </a>
              <Link 
                to="/hackathon" 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center justify-between bg-[var(--color-bg-dark)] border rounded-2xl px-6 py-4 group transition-colors ${
                  pathname === '/hackathon' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-white/5 hover:border-[var(--color-primary)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-sans text-lg font-medium text-white tracking-wide">HACKATHON</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30 px-2 py-0.5 rounded-full animate-pulse">
                    8H
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </Link>
              <a href="/#schedule" onClick={() => setIsOpen(false)} className="flex items-center justify-between bg-[var(--color-bg-dark)] border border-white/5 rounded-2xl px-6 py-4 group hover:border-[var(--color-primary)] transition-colors">
                <span className="font-sans text-lg font-medium text-white tracking-wide">SCHEDULE</span>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Footer */}
            <div className="mt-auto flex flex-col gap-6">
              <a href="/#events" onClick={() => setIsOpen(false)} className="flux-btn-primary w-full group flex justify-center items-center">
                <span>REGISTER NOW</span>
              </a>
              <div className="text-center">
                <p className="font-sans text-xs text-white/50 tracking-widest">
                  JOIN PARADOX 2026
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
