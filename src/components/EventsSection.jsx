import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Code2, Gamepad2, Sparkles, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { CATEGORIES, EVENTS } from '../data/eventsData';

const iconMap = {
  Layers,
  Code2,
  Gamepad2,
  Sparkles,
};

// 1. Memoized Event Card to prevent re-renders when parent state changes
const EventCard = React.memo(({ event, index }) => {
  const formattedNumber = event.number 
    ? event.number.toString().padStart(2, '0')
    : (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="h-full will-change-[transform,opacity]"
    >
      <Link 
        to={`/events/${event.id}`} 
        className="flux-card block relative h-full min-h-[240px] group cursor-pointer no-underline p-8 border border-white/5 hover:border-[var(--color-primary)]/40 transition-all duration-500 rounded-3xl"
      >
        {/* Large Background Watermark Number */}
        <div className="absolute top-4 right-6 font-sans text-[4.5rem] md:text-[5rem] leading-none font-black text-white/[0.03] group-hover:text-[var(--color-primary)]/15 transition-colors duration-500 pointer-events-none select-none">
          {formattedNumber}
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Track / Category Tag */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] group-hover:scale-[2] transition-transform duration-300"></div>
            <span className="font-sans text-[10px] text-[var(--color-primary)] uppercase tracking-widest font-bold">
              {event.categoryLabel || event.category?.toUpperCase() || 'EVENT'}
            </span>
            <span className="text-white/20 text-xs">•</span>
            <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest font-semibold group-hover:text-gray-200 transition-colors">
              {event.type}
            </span>
          </div>

          {/* Event Title */}
          <h3 className="font-sans text-white text-xl md:text-2xl font-bold mb-2 tracking-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">
            {event.title}
          </h3>

          {/* Subtitle / Alternate Name */}
          {event.subtitle && (
            <p className="text-gray-400 text-xs font-medium mb-3 line-clamp-1 leading-relaxed">
              {event.subtitle}
            </p>
          )}

          {/* Description preview */}
          {event.description && (
            <p className="text-gray-500 text-xs font-normal mb-6 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}
          
          {/* Hover Action */}
          <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-gray-500 group-hover:text-white transition-colors duration-300">
            <span className={`text-xs font-medium tracking-wider uppercase ${event.registrationClosed ? 'text-amber-500/80 font-bold' : ''}`}>
              {event.registrationClosed ? 'Registration Closed' : (event.status || 'Register Now')}
            </span>
            <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[var(--color-primary)]/20 flex items-center justify-center transition-colors duration-300">
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

const EventsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [allEvents, setAllEvents] = useState(EVENTS);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Listen for real-time updates from Firebase
    const unsubscribe = onSnapshot(collection(db, "customEvents"), (snapshot) => {
      const customEventsMap = new Map();
      snapshot.forEach((doc) => {
        customEventsMap.set(doc.id, doc.data());
      });
      
      const merged = [];
      const processedIds = new Set();

      // Handle base events: apply custom edits or filter deleted
      for (const baseEvent of EVENTS) {
        if (customEventsMap.has(baseEvent.id)) {
          const custom = customEventsMap.get(baseEvent.id);
          const isApproved = !custom.approvalStatus || custom.approvalStatus === 'approved';
          if (!custom.deleted && isApproved) {
            merged.push({ ...baseEvent, ...custom });
          }
          processedIds.add(baseEvent.id);
        } else {
          merged.push(baseEvent);
        }
      }

      // Prepend newly added custom events
      for (const [id, custom] of customEventsMap.entries()) {
        const isApproved = !custom.approvalStatus || custom.approvalStatus === 'approved';
        if (!processedIds.has(id) && !custom.deleted && isApproved) {
          merged.unshift(custom);
        }
      }

      setAllEvents(merged);
    }, (error) => {
      console.error("Error fetching live Firebase events:", error);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // 2. Pre-calculate category counts using useMemo
  const categoryCounts = useMemo(() => {
    const counts = { all: allEvents.length, coding: 0, esports: 0, general: 0 };
    
    allEvents.forEach(event => {
      let cat = event.category?.toLowerCase();
      if (!cat) {
        const typeLower = (event.type || '').toLowerCase();
        if (typeLower.includes('cod') || typeLower.includes('dev') || typeLower.includes('prompt') || typeLower.includes('debug')) {
          cat = 'coding';
        } else if (typeLower.includes('gam') || typeLower.includes('esport') || typeLower.includes('play')) {
          cat = 'esports';
        } else {
          cat = 'general';
        }
      }
      
      if (counts[cat] !== undefined) {
        counts[cat]++;
      }
    });
    
    return counts;
  }, [allEvents]);

  // 3. Memoize filtered events
  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return allEvents;
    
    return allEvents.filter((event) => {
      if (event.category) {
        return event.category.toLowerCase() === activeCategory.toLowerCase();
      }
      // Heuristic fallback for custom Firebase events if category is not explicitly set
      const typeLower = (event.type || '').toLowerCase();
      if (activeCategory === 'coding') {
        return typeLower.includes('cod') || typeLower.includes('dev') || typeLower.includes('prompt') || typeLower.includes('debug');
      }
      if (activeCategory === 'esports') {
        return typeLower.includes('gam') || typeLower.includes('esport') || typeLower.includes('play');
      }
      if (activeCategory === 'general') {
        return !typeLower.includes('cod') && !typeLower.includes('dev') && !typeLower.includes('prompt') && !typeLower.includes('debug') && !typeLower.includes('gam') && !typeLower.includes('esport');
      }
      return true;
    });
  }, [allEvents, activeCategory]);

  const displayedEvents = useMemo(() => {
    return (activeCategory === 'all' && !showAll) 
      ? filteredEvents.slice(0, 3) 
      : filteredEvents;
  }, [filteredEvents, activeCategory, showAll]);

  return (
    <section 
      id="events" 
      className="min-h-screen w-full py-24 relative z-10 bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left md:text-center mb-12 md:mb-16 relative">
          <div className="absolute top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-[radial-gradient(circle,rgba(255,51,0,0.12)_0%,transparent_65%)] pointer-events-none rounded-full blur-[40px] md:blur-[30px] will-change-transform z-[-1]"></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
              Competitive Tracks
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-white tracking-tight leading-[1.2]">
              Explore Our Events.<br />
              <span className="text-gray-400">Compete With Passion.</span>
            </h2>
            <p className="text-gray-400 font-sans text-sm md:text-base max-w-lg md:mx-auto leading-relaxed mt-4">
              Choose your track to browse Coding, eSports, and General competitions. Test your skills against the best.
            </p>
          </motion.div>
        </div>

        {/* Category Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12 md:mb-16 w-full px-2 sm:px-0"
        >
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-2 md:gap-3 p-2 bg-black/40 border border-white/10 rounded-3xl md:rounded-full backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon] || Layers;
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`relative flex items-center justify-center gap-1.5 md:gap-2.5 px-2 md:px-6 py-2.5 md:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 select-none w-full md:w-auto ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-[0_0_25px_rgba(255,51,0,0.45)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 flex-shrink-0 ${isActive ? 'scale-110' : ''}`} />
                  <span className="truncate">{cat.label}</span>
                  <span 
                    className={`px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-tight transition-colors flex-shrink-0 ${
                      isActive 
                        ? 'bg-black/30 text-white' 
                        : 'bg-white/10 text-gray-400 group-hover:text-white'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 3-Column Events Grid */}
        <motion.div layout={!isMobile} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {displayedEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if category has no events */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">No events found in this category.</p>
          </div>
        )}

        {/* Show More / Show Less Button for "All Events" */}
        {activeCategory === 'all' && filteredEvents.length > 3 && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="bg-transparent hover:bg-white/5 border border-white/20 text-white transition-all rounded-full px-8 py-4 font-bold text-sm tracking-wide shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2.5 group"
            >
              {showAll ? (
                <>
                  Show Top Events
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  Show All {filteredEvents.length} Events
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default EventsSection;
