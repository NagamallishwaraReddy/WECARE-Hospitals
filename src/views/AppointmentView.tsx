import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageHeader from '../components/PageHeader';
import { departments, doctors } from '../data';
import { Calendar, User as UserIcon, Phone, Mail, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { User } from 'firebase/auth';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ViewState } from '../types';

interface AppointmentViewProps {
  user: User;
  setView: (view: ViewState) => void;
}

export default function AppointmentView({ user, setView }: AppointmentViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: user.email || '',
    departmentId: '',
    doctorId: '',
    date: '',
    time: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableDoctors = formData.departmentId 
    ? doctors.filter(d => d.departmentId === formData.departmentId)
    : doctors;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: user.uid,
        status: 'pending',
        createdAt: Date.now()
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Error adding document: ", err);
      setError("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '', phone: '', email: user.email || '', departmentId: '', doctorId: '', date: '', time: '', notes: ''
    });
  };

  return (
    <div className="pb-24">
      <PageHeader 
        badge="Online Booking"
        title="Book an Appointment"
        description="Schedule your visit in just a few clicks. Please fill in the details below, and we will confirm your appointment shortly."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
            >
              <div className="bg-brand-900 px-8 py-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-brand-300" />
                  Appointment Details
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                {error && (
                  <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Personal Info */}
                  <div className="space-y-5 md:col-span-2">
                    <h4 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                        <div className="relative">
                          <UserIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <input 
                            required
                            type="text" 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <input 
                            required
                            type="tel" 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                          <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-5 md:col-span-2 pt-4">
                    <h4 className="font-semibold text-slate-800 border-b border-slate-100 pb-2">Medical Requirement</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
                        <select 
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-700"
                          value={formData.departmentId}
                          onChange={e => {
                            setFormData({...formData, departmentId: e.target.value, doctorId: ''});
                          }}
                        >
                          <option value="">Select Department</option>
                          {departments.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Doctor</label>
                        <select 
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-700"
                          value={formData.doctorId}
                          onChange={e => setFormData({...formData, doctorId: e.target.value})}
                          disabled={availableDoctors.length === 0}
                        >
                          <option value="">Any Available Doctor</option>
                          {availableDoctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Date *</label>
                        <input 
                          required
                          type="date" 
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-700"
                          value={formData.date}
                          onChange={e => setFormData({...formData, date: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Time *</label>
                        <select 
                          required
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-slate-700"
                          value={formData.time}
                          onChange={e => setFormData({...formData, time: e.target.value})}
                        >
                          <option value="">Select Time</option>
                          <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
                          <option value="Afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                          <option value="Evening">Evening (4:00 PM - 8:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes / Symptoms</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <textarea 
                        rows={4}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                        placeholder="Please briefly describe why you are scheduling this appointment..."
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-md flex justify-center items-center text-lg disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin w-5 h-5 mr-2" /> Booking...</>
                    ) : (
                      'Confirm Booking Request'
                    )}
                  </button>
                  <p className="text-sm text-slate-500 mt-4 text-center md:text-left">
                    By confirming, you agree to our privacy policy regarding health data protection.
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-emerald-100 p-10 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-bold font-heading text-slate-900 mb-4">Request Received!</h3>
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. 
                Your appointment request has been submitted successfully. Our staff will contact you at <span className="font-semibold text-slate-800">{formData.phone}</span> shortly to confirm your exact time slot.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-xl max-w-md mx-auto mb-8 border border-slate-100 text-left">
                <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-medium text-slate-700">{formData.date} • {formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-medium text-slate-700">
                      {departments.find(d => d.id === formData.departmentId)?.name || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={handleReset}
                  className="px-8 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg font-medium transition-colors"
                >
                  Book Another
                </button>
                <button 
                  onClick={() => setView('profile')}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
                >
                  View My Appointments
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
