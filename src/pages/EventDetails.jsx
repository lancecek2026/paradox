import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

import { EVENTS_BY_ID } from '../data/eventsData';
import GuidelinesModal from '../components/GuidelinesModal';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        let eventData = EVENTS_BY_ID[eventId] || null;

        // Check Firebase for custom overrides or new custom events
        const docRef = doc(db, "customEvents", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && !docSnap.data().deleted) {
          eventData = eventData ? { ...eventData, ...docSnap.data() } : docSnap.data();
        }

        if (!eventData && EVENTS_BY_ID['c-challenge']) {
          eventData = EVENTS_BY_ID['c-challenge'];
        }

        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEvent(EVENTS_BY_ID[eventId] || EVENTS_BY_ID['c-challenge'] || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (isLoading || !event) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-24 relative overflow-hidden">
      
      {/* Dynamic Ambient Glow based on page */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,51,0,0.05)_0%,transparent_70%)] pointer-events-none rounded-full blur-[30px] z-0 "></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header / Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start mb-6"
        >
          <Link to="/#events" className="flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest transition-colors mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO EVENTS
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] text-xs font-bold tracking-widest uppercase">{event.categoryLabel || event.category || 'EVENT'}</span>
            <span className="text-white/20 text-xs">•</span>
            <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">{event.type}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white uppercase leading-none mb-3">
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="text-gray-300 text-sm md:text-base font-medium max-w-2xl mb-2">
              {event.subtitle}
            </p>
          )}
          {event.description && (
            <p className="text-gray-400 text-xs md:text-sm max-w-2xl leading-relaxed">
              {event.description}
            </p>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Dynamic Poster */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Ultra-premium Ambilight Poster Container - Fits perfectly to image ratio */}
            <div className="relative w-fit h-fit mx-auto flex items-center justify-center group">
              {/* Blurred background duplicate for glowing edge effect */}
              <div 
                className="absolute inset-4 opacity-40 blur-[60px] md:blur-[80px] scale-110 group-hover:opacity-60 transition-opacity duration-700" 
                style={{ backgroundImage: `url(${event.posterUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              ></div>
              
              {/* Loading Spinner */}
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-[32px]">
                  <div className="w-10 h-10 border-4 border-white/10 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                </div>
              )}
              
              <img
                src={event.posterUrl}
                alt={event.title}
                onLoad={() => setIsImageLoaded(true)}
                className={`relative z-10 w-auto h-auto max-w-full max-h-[400px] md:max-h-[500px] lg:max-h-[550px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl sm:rounded-2xl lg:rounded-[32px] group-hover:scale-[1.02] transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`}
              />
            </div>
          </motion.div>

          {/* Right Column - Sleek Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            
            {/* Details List */}
            <div className="flex flex-col gap-6 bg-white/[0.02] border border-white/5 rounded-[32px] p-6 lg:p-8 backdrop-blur-xl flex-1">
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Date</h4>
                    <p className="text-white font-medium text-sm">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Time</h4>
                    <p className="text-white font-medium text-sm">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Venue</h4>
                    <p className="text-white font-medium text-sm">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-0.5">Prize Pool</h4>
                    <p className="text-white font-bold text-lg drop-shadow-[0_0_10px_rgba(255,51,0,0.3)]">₹{event.prizePool}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/5 my-2"></div>

              {/* Event Coordinators */}
              <div>
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Coordinators</h4>
                <div className="flex flex-wrap gap-3">
                  {(event.contacts || []).map((contact, idx) => (
                    <a key={idx} href={`tel:${contact.phone}`} className="flex items-center gap-3 bg-[#111111] hover:bg-[#1a1a1a] transition-colors rounded-full pl-2 pr-4 py-2 border border-white/5 group shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-bold tracking-wider leading-none mb-1">{contact.name}</span>
                        <span className="text-gray-400 text-[10px] font-medium leading-none">{contact.phone}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Action Buttons Integrated into card bottom */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
                {event.registrationClosed ? (
                  <div className="flex-1 bg-white/10 text-white/50 cursor-not-allowed transition-all rounded-full px-6 py-3.5 font-bold text-sm tracking-wide text-center flex items-center justify-center">
                    Registration Closed
                  </div>
                ) : (
                  <a href={event.registrationLink || '#'} rel="noopener noreferrer" className="flex-1 bg-white hover:bg-gray-200 text-[#070707] transition-all rounded-full px-6 py-3.5 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                    Register Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
                <button 
                  type="button"
                  onClick={() => setShowGuidelines(true)}
                  className="flex-1 bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 text-white transition-all rounded-full px-6 py-3.5 font-bold text-sm tracking-wide flex items-center justify-center cursor-pointer"
                >
                  Guidelines
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Guidelines Modal */}
      <GuidelinesModal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
        event={event}
      />
    </div>
  );
};

export default EventDetails;
