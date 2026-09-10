import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Trophy, Phone, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { EVENTS_BY_ID } from '../data/eventsData';
import GuidelinesModal from '../components/GuidelinesModal';

const ReviewPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'coordinator' && password === 'paradox26') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchEvent = async () => {
      try {
        let eventData = EVENTS_BY_ID[eventId] || null;

        const docRef = doc(db, "customEvents", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && !docSnap.data().deleted) {
          eventData = eventData ? { ...eventData, ...docSnap.data() } : docSnap.data();
        }

        if (!eventData) {
          console.error("Event not found in Firebase or local data.");
          setEvent(null);
          return;
        }

        setEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, isAuthenticated]);

  const handleApproval = async (status) => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      const docRef = doc(db, "customEvents", eventId);
      await updateDoc(docRef, {
        approvalStatus: status
      });
      alert(`Event has been successfully ${status}!`);
      navigate('/');
    } catch (error) {
      console.error(`Error updating event status to ${status}:`, error);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)]/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Coordinator Login</h2>
            <p className="text-gray-400 text-sm">Please log in to review and approve events.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(255,51,0,0.3)]"
            >
              Access Review Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-bg-dark)] flex flex-col items-center justify-center text-center p-6">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Event Not Found</h2>
        <p className="text-gray-400 max-w-md">The event ID "{eventId}" could not be found. Make sure you clicked the exact link from your email.</p>
        <button onClick={() => navigate('/admin')} className="mt-6 px-6 py-2 bg-[var(--color-primary)] rounded-full text-white font-bold text-sm">Return to Admin</button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-24 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,51,0,0.05)_0%,transparent_70%)] pointer-events-none rounded-full blur-[30px] z-0 "></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start mb-6"
        >
          <div className="flex items-center gap-3 mb-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase">
            Coordinator Review Mode
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white uppercase leading-none mb-3 mt-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="relative w-fit h-fit mx-auto flex items-center justify-center group">
              <div 
                className="absolute inset-4 opacity-40 blur-[60px] md:blur-[80px] scale-110 group-hover:opacity-60 transition-opacity duration-700" 
                style={{ backgroundImage: `url(${event.posterUrl?.replace(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)\/view.*/, 'lh3.googleusercontent.com/d/$1').replace(/drive\.google\.com\/uc\?id=([a-zA-Z0-9-_]+)/, 'lh3.googleusercontent.com/d/$1').replace(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9-_]+).*/, 'lh3.googleusercontent.com/d/$1')})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              ></div>
              
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm rounded-[32px]">
                  <div className="w-10 h-10 border-4 border-white/10 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                </div>
              )}
              
              <img
                src={event.posterUrl?.replace(/drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)\/view.*/, 'lh3.googleusercontent.com/d/$1').replace(/drive\.google\.com\/uc\?id=([a-zA-Z0-9-_]+)/, 'lh3.googleusercontent.com/d/$1').replace(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9-_]+).*/, 'lh3.googleusercontent.com/d/$1')}
                alt={event.title}
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(true)} // Stop spinning if image fails
                className={`relative z-10 w-auto h-auto max-w-full max-h-[400px] md:max-h-[500px] lg:max-h-[550px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl sm:rounded-2xl lg:rounded-[32px] transition-all duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0 scale-95'}`}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            
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

                {event.prizePool && (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] shrink-0">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-widest mb-0.5">Prize Pool</h4>
                      <p className="text-white font-bold text-lg drop-shadow-[0_0_10px_rgba(255,51,0,0.3)]">₹{event.prizePool}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full h-px bg-white/5 my-2"></div>

              <div>
                <h4 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">Coordinators</h4>
                <div className="flex flex-wrap gap-3">
                  {(event.contacts || []).map((contact, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-[#111111] transition-colors rounded-full pl-2 pr-4 py-2 border border-white/5 group shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-primary)] group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-[11px] font-bold tracking-wider leading-none mb-1">{contact.name}</span>
                        <span className="text-gray-400 text-[10px] font-medium leading-none">{contact.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-2">
                <button 
                  type="button"
                  onClick={() => setShowGuidelines(true)}
                  className="w-full bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 text-white transition-all rounded-full px-6 py-2.5 font-bold text-sm tracking-wide flex items-center justify-center cursor-pointer"
                >
                  View Guidelines
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4 text-center">Coordinator Verification</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button"
                    onClick={() => handleApproval('approved')}
                    disabled={isUpdating}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white transition-all rounded-full px-6 py-3.5 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" /> Approve Event
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleApproval('rejected')}
                    disabled={isUpdating}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white transition-all rounded-full px-6 py-3.5 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" /> Reject Event
                  </button>
                </div>
                {event.approvalStatus && (
                  <p className="text-center text-xs text-gray-400 mt-3 font-semibold uppercase tracking-widest">
                    Current Status: <span className={event.approvalStatus === 'approved' ? 'text-green-400' : event.approvalStatus === 'rejected' ? 'text-red-400' : 'text-amber-400'}>{event.approvalStatus}</span>
                  </p>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <GuidelinesModal
        isOpen={showGuidelines}
        onClose={() => setShowGuidelines(false)}
        event={event}
      />
    </div>
  );
};

export default ReviewPage;
