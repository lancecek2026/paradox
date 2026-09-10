import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HackathonNavbar from './components/HackathonNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import AdminPage from './pages/AdminPage';
import RegistrationPage from './pages/RegistrationPage';
import HackathonPage from './pages/HackathonPage';
import ReviewPage from './pages/ReviewPage';
import './index.css';
import pdoxLogo from './assets/pdox.png';


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(() => {
    // Check if we've already shown the loader in this session
    return !sessionStorage.getItem('paradoxLoaded');
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) return; // Skip if already loaded

    // Sleek, faster professional animation
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('paradoxLoaded', 'true');
      }, 500); // Wait for fade out
    }, 3000); // 3s total load time

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full bg-[var(--color-bg-dark)] font-sans text-gray-100 overflow-x-hidden">
      {/* Loading Screen Overlay - Video Animation */}
      {isLoading && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg-dark)] transition-opacity duration-500 ease-in-out ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img 
            src={pdoxLogo} 
            alt="Paradox Logo Loading"
            className="w-24 sm:w-32 max-w-full h-auto object-contain animate-pulse drop-shadow-[0_0_20px_rgba(255,51,0,0.3)]"
          />
        </div>
      )}

      <ScrollToTop />
      {location.pathname === '/hackathon' ? <HackathonNavbar /> : <Navbar />}

      {/* Professional Aesthetic Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-2] overflow-hidden bg-[var(--color-bg-dark)]">
        
        {/* SVG Noise Texture for Premium Matte Finish - Desktop Only */}
        <div className="hidden md:block absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30"></div>
        
        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,51,0,0.05)_0%,transparent_60%)] md:animate-pulse-slow rounded-full pointer-events-none"></div>
        <div className="absolute top-[30%] right-[-20%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(255,107,0,0.04)_0%,transparent_60%)] md:animate-float rounded-full pointer-events-none" style={{ animationDelay: '-2s', animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(255,51,0,0.03)_0%,transparent_60%)] rounded-full pointer-events-none"></div>
        
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hackathon" element={<HackathonPage />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/register/:eventId" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/review/:eventId" element={<ReviewPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
