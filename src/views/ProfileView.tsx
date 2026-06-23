import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Calendar as CalendarIcon, Clock, LogOut, User as UserIcon, Loader2, Hospital } from 'lucide-react';
import { Appointment, ViewState } from '../types';
import { departments } from '../data';

interface ProfileViewProps {
  user: User;
  setView: (view: ViewState) => void;
}

export default function ProfileView({ user, setView }: ProfileViewProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const appts: Appointment[] = [];
        snapshot.forEach((doc) => {
          appts.push({ id: doc.id, ...doc.data() } as Appointment);
        });
        
        // Sort sequentially since orderBy requires a composite index that might fail in this test
        appts.sort((a, b) => b.createdAt - a.createdAt);
        setAppointments(appts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user.uid]);

  const handleSignOut = () => {
    auth.signOut();
    setView('home');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200'; // pending
    }
  };

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white border-b border-slate-200 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 border-4 border-white shadow-lg">
                <UserIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-heading text-slate-900 mb-1">My Profile</h1>
                <p className="text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-4">
              <button
                onClick={() => setView('appointment')}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                New Appointment
              </button>
              <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-white border border-slate-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-slate-700 rounded-lg font-medium transition-colors flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">My Appointments</h2>
            <span className="bg-brand-100 text-brand-800 text-xs font-bold px-3 py-1 rounded-full">
              {appointments.length} Total
            </span>
          </div>

          {loading ? (
            <div className="p-12 pl-12 flex justify-center items-center">
               <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-16 text-center">
              <CalendarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No appointments yet</h3>
              <p className="text-slate-500 mb-6">You haven't scheduled any medical visits with us yet.</p>
              <button
                onClick={() => setView('appointment')}
                className="px-6 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-lg font-medium transition-colors"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {appointments.map((appt) => {
                const deptName = departments.find(d => d.id === appt.departmentId)?.name || 'General Checkup';
                
                return (
                  <motion.div 
                    key={appt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      
                      <div className="flex items-start space-x-4">
                        <div className="mt-1 bg-brand-50 p-3 rounded-xl text-brand-600">
                          <Hospital className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{deptName}</h3>
                            <span className={`text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${getStatusColor(appt.status)}`}>
                              {appt.status}
                            </span>
                          </div>
                          <p className="text-slate-600 font-medium mb-1">{appt.name}</p>
                          {appt.notes && (
                            <p className="text-slate-500 text-sm italic line-clamp-1 max-w-md">"{appt.notes}"</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end space-y-2 md:space-y-1 ml-14 md:ml-0 bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-lg md:rounded-none">
                        <div className="flex items-center text-slate-700">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{appt.date}</span>
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{appt.time}</span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
