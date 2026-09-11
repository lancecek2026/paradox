import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Calendar, Clock, MapPin, Trophy, Users, Save, X, Plus, 
  Edit3, Trash2, Search, RotateCcw, Check, Sparkles, Layers, ArrowUp, Download, Settings, FileText
} from 'lucide-react';
import { db } from '../firebase';
import { collection, doc, setDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { EVENTS } from '../data/eventsData';
import GuidelinesModal from '../components/GuidelinesModal';

const initialFormState = {
  title: '',
  category: 'coding',
  type: '',
  date: '',
  time: '',
  venue: '',
  prizePool: '',
  posterUrl: '',
  contacts: [{ name: '', phone: '' }],
  customFields: [],
  registrationClosed: false
};

const categoryLabels = {
  coding: 'Technical Events',
  esports: 'eSports Events',
  general: 'General Events'
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('events'); // 'events' or 'registrations'
  const [formData, setFormData] = useState(initialFormState);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Events list & filter state
  const [allEvents, setAllEvents] = useState(EVENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [statusMessage, setStatusMessage] = useState(null);

  // Registrations state
  const [selectedEventId, setSelectedEventId] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [isLoadingRegs, setIsLoadingRegs] = useState(false);

  // Schedule state
  const [scheduleItems, setScheduleItems] = useState([]);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  // Guidelines modal preview
  const [viewingGuidelinesEvent, setViewingGuidelinesEvent] = useState(null);

  useEffect(() => {
    // Listen for real-time updates from Firebase
    const unsubscribe = onSnapshot(collection(db, "customEvents"), (snapshot) => {
      const customEventsMap = new Map();
      snapshot.forEach((docSnap) => {
        customEventsMap.set(docSnap.id, docSnap.data());
      });

      const merged = [];
      const processedIds = new Set();

      // Handle base events: apply custom edits or filter deleted
      for (const baseEvent of EVENTS) {
        if (customEventsMap.has(baseEvent.id)) {
          const custom = customEventsMap.get(baseEvent.id);
          if (!custom.deleted) {
            merged.push({ ...baseEvent, ...custom });
          }
          processedIds.add(baseEvent.id);
        } else {
          merged.push(baseEvent);
        }
      }

      // Prepend newly added custom events
      for (const [id, custom] of customEventsMap.entries()) {
        if (!processedIds.has(id) && !custom.deleted) {
          merged.unshift(custom);
        }
      }

      setAllEvents(merged);
    }, (error) => {
      console.error("Error fetching live Firebase events:", error);
    });

    const unsubSchedule = onSnapshot(doc(db, "siteData", "schedule"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().items) {
        setScheduleItems(docSnap.data().items);
      } else {
        setScheduleItems([]);
      }
    });

    return () => { unsubscribe(); unsubSchedule(); };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (index, field, value) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    setFormData(prev => ({ ...prev, contacts: newContacts }));
  };

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, { name: '', phone: '' }]
    }));
  };

  const removeContact = (index) => {
    const newContacts = formData.contacts.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, contacts: newContacts }));
  };

  // --- Custom Fields Builder Helpers ---
  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), { id: `field_${Date.now()}`, label: '', type: 'text', required: true, options: '' }]
    }));
  };

  const updateCustomField = (index, key, value) => {
    const newFields = [...(formData.customFields || [])];
    newFields[index][key] = value;
    setFormData(prev => ({ ...prev, customFields: newFields }));
  };

  const removeCustomField = (index) => {
    const newFields = (formData.customFields || []).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, customFields: newFields }));
  };
  // -------------------------------------
  
  // --- Schedule Logic ---
  const handleAddScheduleItem = () => {
    setScheduleItems(prev => [...prev, { id: `sch_${Date.now()}`, day: 'Day 1', time: '', title: '', location: '', desc: '' }]);
  };

  const handleUpdateScheduleItem = (index, field, value) => {
    const newItems = [...scheduleItems];
    newItems[index][field] = value;
    setScheduleItems(newItems);
  };

  const handleRemoveScheduleItem = (index) => {
    const newItems = scheduleItems.filter((_, i) => i !== index);
    setScheduleItems(newItems);
  };

  const handleSaveSchedule = async () => {
    setIsSavingSchedule(true);
    try {
      await setDoc(doc(db, "siteData", "schedule"), { items: scheduleItems });
      alert("Schedule saved successfully!");
    } catch (err) {
      console.error("Error saving schedule:", err);
      alert("Error saving schedule: " + err.message);
    } finally {
      setIsSavingSchedule(false);
    }
  };
  // -------------------------------------

  // --- Registrations Logic ---
  const fetchRegistrations = async (eventId) => {
    setSelectedEventId(eventId);
    if (!eventId) {
      setRegistrations([]);
      return;
    }
    setIsLoadingRegs(true);
    try {
      const q = query(collection(db, "registrations"), where("eventId", "==", eventId));
      const querySnapshot = await getDocs(q);
      const regs = [];
      querySnapshot.forEach((doc) => {
        regs.push({ id: doc.id, ...doc.data() });
      });
      // Sort by timestamp if available
      regs.sort((a, b) => {
        const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
        const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
        return timeB - timeA; // newest first
      });
      setRegistrations(regs);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      alert("Failed to load registrations.");
    } finally {
      setIsLoadingRegs(false);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;
    
    // Find event to know what custom fields exist
    const currentEvent = allEvents.find(e => e.id === selectedEventId);
    const customFields = currentEvent?.customFields || [];

    // Base headers
    const headers = ['Name', 'Email', 'Phone', 'Semester', 'Department', 'Date Registered', 'Payment Image URL'];
    
    // Add custom field headers
    customFields.forEach(field => {
      headers.push(field.label || field.id);
    });

    const rows = registrations.map(reg => {
      const dateStr = reg.timestamp?.toDate ? reg.timestamp.toDate().toLocaleString() : 'N/A';
      
      const rowData = [
        `"${reg.name || ''}"`,
        `"${reg.email || ''}"`,
        `"${reg.phone || ''}"`,
        `"${reg.semester || ''}"`,
        `"${reg.department || ''}"`,
        `"${dateStr}"`,
        `"${reg.paymentScreenshotUrl || ''}"`
      ];

      // Add custom field values
      customFields.forEach(field => {
        const val = (reg.additionalData && reg.additionalData[field.id]) || '';
        rowData.push(`"${val.replace(/"/g, '""')}"`);
      });

      return rowData.join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentEvent?.title || 'event'}_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // ---------------------------

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const startEditEvent = (event) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title || '',
      category: event.category || 'coding',
      type: event.type || '',
      date: event.date || '',
      time: event.time || '',
      venue: event.venue || '',
      prizePool: event.prizePool || '',
      posterUrl: event.posterUrl || '',
      contacts: event.contacts && event.contacts.length > 0 ? event.contacts : [{ name: '', phone: '' }],
      customFields: event.customFields || [],
      registrationClosed: event.registrationClosed || false
    });
    setPreviewImage(event.posterUrl || null);
    setImageFile(null);
    setActiveTab('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingEventId(null);
    setFormData(initialFormState);
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleDeleteEvent = async (event) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${event.title}"?\nThis will remove the event from the site.`);
    if (!isConfirmed) return;

    try {
      // Mark as deleted in Firestore so it immediately disappears for all users
      await setDoc(doc(db, "customEvents", event.id), {
        id: event.id,
        deleted: true,
        deletedAt: new Date().toISOString()
      }, { merge: true });

      if (editingEventId === event.id) {
        cancelEdit();
      }

      setStatusMessage({ type: 'success', text: `Event "${event.title}" was successfully deleted!` });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Could not delete event: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Target event ID
      const targetId = editingEventId 
        ? editingEventId 
        : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      if (!targetId) {
        throw new Error("Event Title must contain at least one letter or number.");
      }

      const withTimeout = (promise, ms, msg) => {
        return Promise.race([
          promise,
          new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms))
        ]);
      };

      let finalPosterUrl = formData.posterUrl;

      // Upload image to Google Drive if new file selected
      if (imageFile) {
        try {
          const fileToBase64 = (file) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
          });
          
          const base64String = await fileToBase64(imageFile);
          
          const payload = {
            base64: base64String,
            filename: `poster-${targetId}-${Date.now()}-${imageFile.name}`,
            mimeType: imageFile.type
          };

          const response = await fetch('https://script.google.com/macros/s/AKfycbwE-63_6k2oBHtQB65zzTxw-dxeXlses0FowN2nf9VzeQGtZKw-sgK73abpENxdNO-j/exec', {
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
          });
          
          const data = await response.json();
          if (data.success) {
            let driveUrl = data.url;
            const match = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (match && match[1]) {
              finalPosterUrl = `https://lh3.googleusercontent.com/d/${match[1]}`;
            } else {
              finalPosterUrl = driveUrl;
            }
          } else {
            throw new Error(data.error || 'Google Drive upload failed');
          }
        } catch (imgError) {
          console.warn("Google Drive upload failed...", imgError);
          alert("Warning: Could not upload the image... " + imgError.message);
        }
      }
      
      const eventPayload = {
        ...formData,
        id: targetId,
        category: formData.category || 'coding',
        categoryLabel: categoryLabels[formData.category] || 'Event',
        posterUrl: finalPosterUrl,
        status: formData.registrationClosed ? 'Registration Closed' : 'Register Now',
        approvalStatus: 'pending', // All edits require re-approval
        deleted: false,
        updatedAt: new Date().toISOString()
      };

      // Save to Firestore CustomEvents collection
      await withTimeout(
        setDoc(doc(db, "customEvents", targetId), eventPayload, { merge: true }),
        6000,
        "Database save timed out. Your connection to Firebase might be blocked!"
      );

      // Trigger email for new events AND edits
      try {
        const reviewLink = `${window.location.origin}/review/${targetId}`;
        const emailPayload = {
          type: 'email',
          to: 'edwinjijo500@gmail.com', // Coordinator's email address
          subject: editingEventId ? `Event Edited Pending Approval: ${formData.title}` : `New Event Pending Approval: ${formData.title}`,
          body: editingEventId 
            ? `The event "${formData.title}" has been modified and requires your re-approval.\n\nReview it here: ${reviewLink}`
            : `A new event "${formData.title}" has been submitted and is pending your approval.\n\nReview it here: ${reviewLink}`
        };
          
          // Try sending using the Google Apps Script endpoint.
          fetch('https://script.google.com/macros/s/AKfycbwE-63_6k2oBHtQB65zzTxw-dxeXlses0FowN2nf9VzeQGtZKw-sgK73abpENxdNO-j/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(emailPayload)
          })
          .then(res => res.json())
          .then(data => {
            console.log("Email response:", data);
            if (!data.success) throw new Error("Apps Script returned success: false");
          })
          .catch(e => {
            console.warn("Email trigger failed, using mailto fallback:", e);
            window.open(`mailto:amilmether37@gmail.com?subject=${encodeURIComponent(emailPayload.subject)}&body=${encodeURIComponent(emailPayload.body)}`, '_blank');
          });
        } catch (e) {
          console.error("Failed to send approval email", e);
        }

      const actionText = editingEventId ? "updated" : "added";
      setStatusMessage({ type: 'success', text: `Event "${formData.title}" ${actionText} successfully!` });
      setTimeout(() => setStatusMessage(null), 4000);
      
      // Reset form
      cancelEdit();
    } catch (error) {
      console.error("Error saving event: ", error);
      alert("Error saving event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter events for the directory
  const filteredEvents = allEvents.filter(event => {
    const matchesCategory = activeCategoryFilter === 'all' || (event.category || '').toLowerCase() === activeCategoryFilter.toLowerCase();
    const search = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      (event.title && event.title.toLowerCase().includes(search)) ||
      (event.type && event.type.toLowerCase().includes(search)) ||
      (event.venue && event.venue.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (authUsername === 'admin' && authPassword === 'lancecek@2026') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-24 relative overflow-hidden flex items-center justify-center px-6">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,51,0,0.05)_0%,transparent_70%)] pointer-events-none rounded-full blur-[30px] z-0 "></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/40 border border-white/10 p-8 md:p-12 rounded-[32px] max-w-md w-full backdrop-blur-xl relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] shadow-[0_0_20px_rgba(255,51,0,0.2)]">
              <Settings className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-sans font-bold text-white tracking-wide">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-2">Authorized access only</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Username</label>
              <input 
                type="text" 
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors w-full"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors w-full"
              />
            </div>
            
            <AnimatePresence>
              {authError && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-xs font-bold text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                >
                  {authError}
                </motion.p>
              )}
            </AnimatePresence>
            
            <button 
              type="submit"
              className="mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,51,0,0.3)] hover:shadow-[0_0_30px_rgba(255,51,0,0.5)] flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowUp className="w-4 h-4 rotate-45" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 relative z-10 w-full max-w-[1300px] mx-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 bg-[#16a34a] text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(22,163,74,0.4)] flex items-center gap-3 font-semibold text-sm border border-white/20"
          >
            <Check className="w-4 h-4" />
            <span>{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
            <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">Admin Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-tight">
            {editingEventId ? 'Edit Event' : 'Event Control Center'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {editingEventId ? `Updating details for "${formData.title}"` : 'Add, edit, or remove competitions from the platform.'}
          </p>
        </div>

        {editingEventId && activeTab === 'events' && (
          <button
            onClick={cancelEdit}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Cancel Editing
          </button>
        )}
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <button 
          onClick={() => { setActiveTab('events'); setEditingEventId(null); setFormData(initialFormState); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,51,0,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
        >
          <Sparkles className="w-4 h-4" />
          Event Manager
        </button>
        <button 
          onClick={() => { setActiveTab('schedule'); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'schedule' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,51,0,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
        >
          <Clock className="w-4 h-4" />
          Schedule Manager
        </button>
        <button 
          onClick={() => { setActiveTab('registrations'); fetchRegistrations(''); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'registrations' ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,51,0,0.3)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
        >
          <Users className="w-4 h-4" />
          Registrations Viewer
        </button>
      </div>

      {activeTab === 'events' ? (
      <>
      {/* Main Form Area */}
      <motion.form 
        id="event-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
      >
        
        {/* Left Column: Image Upload & Preview */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className={`flux-card p-6 h-full min-h-[380px] flex flex-col transition-all duration-300 ${editingEventId ? 'border-[var(--color-primary)]/50' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-bold tracking-wide uppercase">Event Poster</h3>
              {editingEventId && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30">
                  EDIT MODE
                </span>
              )}
            </div>
            
            <div className="flex-1 relative rounded-2xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center overflow-hidden group cursor-pointer min-h-[260px]">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              {previewImage ? (
                <div className="relative w-full h-full group">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <Upload className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-bold tracking-widest uppercase">Click to Upload</span>
                  <span className="text-[10px] text-gray-600">JPG, PNG or WebP</span>
                </div>
              )}
            </div>

            {/* Manual Image URL Input */}
            <div className="mt-4 flex flex-col gap-2">
              <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
                <span>Or Paste Image URL</span>
                <span className="text-gray-600 font-normal lowercase tracking-normal">(if upload fails)</span>
              </label>
              <input 
                type="text" 
                value={formData.posterUrl}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, posterUrl: e.target.value }));
                  setPreviewImage(e.target.value);
                  setImageFile(null); // Clear file upload if they paste a URL
                }}
                placeholder="https://imgbb.com/... or https://imgur.com/..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Event Details Form */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className={`flux-card p-6 md:p-8 transition-all duration-300 ${editingEventId ? 'border-[var(--color-primary)]/50' : ''}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-bold tracking-wide">
                {editingEventId ? `Edit Event: ${formData.title || 'Untitled'}` : 'Event Information'}
              </h3>
              {editingEventId && (
                <span className="text-xs text-amber-400 font-medium flex items-center gap-1.5 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  <Edit3 className="w-3.5 h-3.5" /> Modifying existing event
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {/* Title */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Event Title</label>
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. BLIND CODING"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              {/* Category Track */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Track / Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  <option value="coding" className="bg-[#121212] text-white">Technical Events</option>
                  <option value="esports" className="bg-[#121212] text-white">eSports Events</option>
                  <option value="general" className="bg-[#121212] text-white">General Events</option>
                </select>
              </div>

              {/* Type / Sub-badge */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Event Badge / Sub-type</label>
                <input 
                  type="text" 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. AI Prompting, Strategy, Web Dev"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>

              {/* Prize Pool */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Prize Pool (₹)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <input 
                    type="number" 
                    name="prizePool"
                    value={formData.prizePool}
                    onChange={handleInputChange}
                    placeholder="e.g. 2000"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-[var(--color-primary)] font-bold focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g. 7/10/2025"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Time</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <Clock className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g. 9:45 AM - 12:30 PM"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Venue</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="e.g. Main Stage / CSLH5"
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-white/5 my-6"></div>

            {/* Coordinators */}
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-white text-sm font-bold tracking-wide uppercase">Event Coordinators</h4>
              <button 
                type="button"
                onClick={addContact}
                className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Contact
              </button>
            </div>
            
            <div className="flex flex-col gap-3 mb-6">
              {formData.contacts.map((contact, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Name (e.g. BHAVYA)"
                      value={contact.name}
                      onChange={(e) => handleContactChange(idx, 'name', e.target.value)}
                      className="bg-transparent w-full text-sm text-white focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <span className="text-gray-500 text-xs shrink-0">+91</span>
                    <input 
                      type="text" 
                      placeholder="Phone (e.g. 7510695281)"
                      value={contact.phone}
                      onChange={(e) => handleContactChange(idx, 'phone', e.target.value)}
                      className="bg-transparent w-full text-sm text-white focus:outline-none placeholder:text-gray-600"
                    />
                  </div>
                  {formData.contacts.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeContact(idx)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors border border-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-white/5 my-6"></div>

            {/* Custom Registration Fields Builder */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-white text-sm font-bold tracking-wide uppercase">Custom Registration Fields</h4>
                <p className="text-gray-500 text-xs mt-1">Name, Email, Phone, Semester, and Dept are included automatically.</p>
              </div>
              <button 
                type="button"
                onClick={addCustomField}
                className="flex items-center gap-1 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Field
              </button>
            </div>
            
            <div className="flex flex-col gap-4 mb-8">
              {(formData.customFields || []).map((field, idx) => (
                <div key={idx} className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Field Label</label>
                      <input 
                        type="text" 
                        placeholder="e.g. GitHub Link or Team Name"
                        value={field.label}
                        onChange={(e) => updateCustomField(idx, 'label', e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                        required
                      />
                    </div>
                    <div className="w-32 flex flex-col gap-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Type</label>
                      <select 
                        value={field.type}
                        onChange={(e) => updateCustomField(idx, 'type', e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                      >
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="select">Dropdown</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 justify-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={field.required} onChange={(e) => updateCustomField(idx, 'required', e.target.checked)} className="rounded bg-black border-white/20 accent-[var(--color-primary)]" />
                        <span className="text-xs text-gray-400">Required</span>
                      </label>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeCustomField(idx)}
                      className="mt-6 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {field.type === 'select' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Dropdown Options (Comma Separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Beginner, Intermediate, Advanced"
                        value={field.options || ''}
                        onChange={(e) => updateCustomField(idx, 'options', e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)]"
                        required
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Registration Status */}
            <div className="mb-8 flex items-center justify-between bg-black/30 border border-white/5 rounded-xl p-4">
              <div>
                <h4 className="text-white text-sm font-bold tracking-wide uppercase">Close Registration</h4>
                <p className="text-gray-500 text-xs mt-1">Check this to stop accepting new registrations for this event.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="registrationClosed"
                  checked={formData.registrationClosed}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationClosed: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {editingEventId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-4 rounded-xl border border-white/10 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-white hover:bg-gray-200 text-[#070707] transition-all rounded-xl px-8 py-4 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#070707]/30 border-t-[#070707] rounded-full animate-spin"></span>
                    SAVING...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingEventId ? 'UPDATE EVENT' : 'CREATE EVENT'}
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

      </motion.form>

      {/* Directory & Management Section */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
              <h2 className="text-2xl font-bold text-white tracking-tight">Event Directory & Actions</h2>
            </div>
            <p className="text-gray-400 text-xs">
              Manage existing competitions ({filteredEvents.length} shown). Click Edit to modify or Delete to remove.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills for Admin Table */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            { id: 'all', label: 'All' },
            { id: 'coding', label: 'Coding' },
            { id: 'esports', label: 'eSports' },
            { id: 'general', label: 'General' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                activeCategoryFilter === cat.id
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(255,51,0,0.35)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => {
              const isCurrentlyEditing = editingEventId === event.id;

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`flux-card p-5 rounded-2xl flex flex-col justify-between relative transition-all duration-300 ${
                    isCurrentlyEditing 
                      ? 'border-[var(--color-primary)] shadow-[0_0_25px_rgba(255,51,0,0.3)] bg-[var(--color-primary)]/[0.03]' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Header: Track & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)]">
                        {event.categoryLabel || event.category || 'EVENT'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {event.approvalStatus === 'pending' && (
                          <span className="text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full text-amber-400 uppercase tracking-wider">
                            Pending
                          </span>
                        )}
                        {event.approvalStatus === 'rejected' && (
                          <span className="text-[10px] font-bold bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full text-red-400 uppercase tracking-wider">
                            Rejected
                          </span>
                        )}
                        {event.registrationClosed && (
                          <span className="text-[10px] font-bold bg-gray-500/10 border border-gray-500/20 px-2 py-0.5 rounded-full text-gray-400 uppercase tracking-wider">
                            Closed
                          </span>
                        )}
                        <span className="text-[10px] font-semibold bg-white/5 px-2.5 py-0.5 rounded-full text-gray-300 uppercase tracking-wider">
                          {event.type}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-white font-bold text-lg mb-2 tracking-tight line-clamp-1">
                      {event.title}
                    </h4>

                    {/* Meta info */}
                    <div className="flex flex-col gap-1 text-xs text-gray-400 mb-4">
                      {event.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                      )}
                      {event.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      )}
                      {event.prizePool && (
                        <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold">
                          <Trophy className="w-3.5 h-3.5 shrink-0" />
                          <span>₹{event.prizePool}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Guidelines, Edit & Delete Buttons */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingGuidelinesEvent(event)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 hover:border-white/20 transition-all"
                      title="View Guidelines"
                    >
                      <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      Guidelines
                    </button>

                    <button
                      onClick={() => startEditEvent(event)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isCurrentlyEditing 
                          ? 'bg-[var(--color-primary)] text-white' 
                          : 'bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      {isCurrentlyEditing ? 'Editing' : 'Edit'}
                    </button>

                    <button
                      onClick={() => handleDeleteEvent(event)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 transition-all"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 flux-card rounded-2xl">
            <p className="text-gray-500 text-sm">No events found matching "{searchTerm}".</p>
          </div>
        )}
      </div>
      </>
      ) : activeTab === 'schedule' ? (
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 mb-20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Schedule Management</h2>
            <p className="text-sm text-gray-400">Add, edit, or delete events from the schedule timeline.</p>
          </div>
          <button 
            onClick={handleSaveSchedule}
            disabled={isSavingSchedule}
            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,51,0,0.3)] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSavingSchedule ? 'Saving...' : 'Save Schedule'}
          </button>
        </div>

        <div className="flux-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-sm font-bold tracking-wide uppercase">Timeline Events ({scheduleItems.length})</h3>
            <button 
              onClick={handleAddScheduleItem}
              className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {scheduleItems.length === 0 ? (
            <div className="text-center py-12 bg-black/20 rounded-2xl border border-white/5">
              <p className="text-gray-500 text-sm">No schedule items found. Click "Add Item" to create one.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {scheduleItems.map((item, index) => (
                <div key={item.id || index} className="flex flex-col gap-4 p-5 bg-black/40 border border-white/10 rounded-xl relative group">
                  <button 
                    onClick={() => handleRemoveScheduleItem(index)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Day *</label>
                      <select 
                        value={item.day || 'Day 1'} 
                        onChange={(e) => handleUpdateScheduleItem(index, 'day', e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      >
                        <option value="Day 1">Day 1</option>
                        <option value="Day 2">Day 2</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Time *</label>
                      <input 
                        type="text" 
                        value={item.time} 
                        onChange={(e) => handleUpdateScheduleItem(index, 'time', e.target.value)}
                        placeholder="e.g. 09:30 AM"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Title *</label>
                      <input 
                        type="text" 
                        value={item.title} 
                        onChange={(e) => handleUpdateScheduleItem(index, 'title', e.target.value)}
                        placeholder="e.g. INAUGURATION"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Location *</label>
                      <input 
                        type="text" 
                        value={item.location} 
                        onChange={(e) => handleUpdateScheduleItem(index, 'location', e.target.value)}
                        placeholder="e.g. Main Stage"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Description *</label>
                      <textarea 
                        value={item.desc} 
                        onChange={(e) => handleUpdateScheduleItem(index, 'desc', e.target.value)}
                        placeholder="Short description..."
                        rows="2"
                        className="bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      ) : (
      <div className="w-full">
        {/* Registration Viewer Tab */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col gap-2 w-full md:w-1/3">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Select Event</label>
            <select
              value={selectedEventId}
              onChange={(e) => fetchRegistrations(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] transition-colors w-full"
            >
              <option value="">-- Choose an event --</option>
              {allEvents.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{registrations.length}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Total Registrations</p>
            </div>
            {registrations.length > 0 && (
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,51,0,0.3)] hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {selectedEventId && (
          <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
            {isLoadingRegs ? (
              <div className="p-12 flex justify-center">
                <div className="w-8 h-8 border-4 border-white/20 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
              </div>
            ) : registrations.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-20" />
                No registrations found for this event yet.
              </div>
            ) : (
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="text-xs uppercase bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Sem/Dept</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-bold text-white">{reg.name}</td>
                      <td className="px-6 py-4">{reg.email}</td>
                      <td className="px-6 py-4">{reg.phone}</td>
                      <td className="px-6 py-4">{reg.semester} / {reg.department}</td>
                      <td className="px-6 py-4">{reg.timestamp?.toDate ? reg.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4">
                        {reg.paymentScreenshotUrl ? (
                          <a href={reg.paymentScreenshotUrl} target="_blank" rel="noreferrer" className="text-[var(--color-primary)] hover:underline text-xs font-bold uppercase tracking-wider">
                            View Image
                          </a>
                        ) : (
                          <span className="text-gray-500 text-xs">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      )}

      {/* Guidelines Modal Preview */}
      <GuidelinesModal
        isOpen={!!viewingGuidelinesEvent}
        onClose={() => setViewingGuidelinesEvent(null)}
        event={viewingGuidelinesEvent}
      />
    </div>
  );
};

export default AdminPage;
