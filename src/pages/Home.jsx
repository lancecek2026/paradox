import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import ScheduleSection from '../components/ScheduleSection';
import PartnersSection from '../components/PartnersSection';

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <ScheduleSection />
      <PartnersSection />
    </main>
  );
};

export default Home;
