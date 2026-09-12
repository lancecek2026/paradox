import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const fallbackSchedule = [
  { time: '09:30 AM', title: 'INAUGURATION', location: 'Main Stage', desc: 'Opening ceremony with keynote speakers' },
  { time: '09:45 AM', title: 'SPEED TYPING & DEBATE', location: 'IP Lab / CSLH5', desc: 'Fast-paced typing and debate competition' },
  { time: '10:00 AM', title: 'C CHALLENGE & CODE RELAY', location: 'BC Lab / MM Lab', desc: 'Coding challenges and team-based sequential programming' },
];

const ScheduleSection = () => {
  const containerRef = useRef(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [activeDay, setActiveDay] = useState('Day 1');
  const [showAll, setShowAll] = useState(false);

  const handleDayChange = (day) => {
    setActiveDay(day);
    setShowAll(false);
  };
  
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const docRef = doc(db, "siteData", "schedule");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().items) {
          setScheduleData(docSnap.data().items);
        } else {
          setScheduleData(fallbackSchedule);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setScheduleData(fallbackSchedule);
      }
    };
    fetchSchedule();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const currentScheduleItems = scheduleData.filter(item => (item.day || 'Day 1') === activeDay);
  const visibleItems = showAll ? currentScheduleItems : currentScheduleItems.slice(0, 3);

  return (
    <section id="schedule" className="w-full py-24 relative z-10 overflow-hidden bg-transparent">
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 tracking-tight text-white">
            Schedule Overview
          </h2>
          <p className="text-gray-400 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Plan your day. Stay ahead of the curve.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleDayChange('Day 1')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                activeDay === 'Day 1'
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,51,0,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => handleDayChange('Day 2')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${
                activeDay === 'Day 2'
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,51,0,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Day 2
            </button>
          </div>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Vertical Glowing Timeline */}
          <div className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] shadow-[0_0_15px_rgba(255,51,0,0.8)] origin-top"
              style={{ height: '100%', scaleY: smoothProgress }}
            />
          </div>

          <div className="relative w-full flex flex-col gap-8 z-10">
            {visibleItems.map((item, index) => {
              const isRight = index % 2 !== 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`relative flex items-center w-full`}
                >
                  {/* Timeline Node */}
                  <div className={`absolute left-[1.5rem] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-bg-dark)] border-[3px] border-[var(--color-primary)] shadow-[0_0_15px_rgba(255,51,0,0.6)] z-20 transition-transform duration-300 hover:scale-[1.7]`}></div>

                  {/* Tech Card */}
                  <div className={`w-full pl-14 pr-6 md:px-0 md:w-1/2 flex ${isRight ? 'md:ml-auto md:pl-8 lg:pl-12 md:justify-start' : 'md:mr-auto md:pr-8 lg:pr-12 md:justify-end'}`}>
                    
                    <div className="flux-card w-full md:w-[85%] lg:w-[75%] p-4 md:p-5 group relative overflow-hidden text-left">
                      {/* Subtle hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col gap-2 mb-3">
                        <span className="inline-block self-start bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/30 font-sans text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(255,51,0,0.1)]">
                          {item.time}
                        </span>
                        <h3 className="font-sans text-white text-lg md:text-xl font-bold tracking-tight leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="font-sans font-medium text-gray-300 text-xs md:text-sm tracking-wide mb-1.5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                          {item.location}
                        </p>
                        <p className="font-sans text-gray-500 text-xs md:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Show All Button */}
          {currentScheduleItems.length > 3 && !showAll && (
            <div className="flex justify-center mt-12 relative z-20">
              <button 
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(255,51,0,0.2)]"
              >
                Show all schedules
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
