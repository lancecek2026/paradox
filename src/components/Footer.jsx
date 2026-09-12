import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-bg-dark)] text-white py-12 font-sans border-t border-white/5 mt-auto z-10 relative">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          
          {/* Brand & Dept */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight font-sans mb-1">
              PARADOX<span className="text-[var(--color-primary)]">26</span>
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs font-medium">
              Department of Computer Science<br />
              and Engineering, College of<br />
              Engineering Kidangoor
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="/#about" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">About</a></li>
              <li><a href="/#events" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Events</a></li>
              <li><Link to="/hackathon" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Hackathon</Link></li>
              <li><a href="/#schedule" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Schedule</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide text-white">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400 font-medium leading-relaxed">
              <li>College of Engineering Kidangoor</li>
              <li>Kidangoor South P.O</li>
              <li>Kottayam, Kerala - 686583</li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide text-white">Follow Us</h3>
            <div className="flex flex-row gap-4">
              <a href="https://www.instagram.com/lance_cek?stkn=NWgxeXZveDdvcnBx" className="text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-medium">Instagram</a>
             
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col items-center justify-center text-center gap-2">
          <p className="text-gray-400 font-medium text-xs">
            &copy; 2026 PARADOX. All rights reserved.
          </p>
          <p className="text-gray-500 font-medium text-[11px]">
            Designed by the PARADOX Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
