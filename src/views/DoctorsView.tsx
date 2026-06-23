import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageHeader from '../components/PageHeader';
import { departments, doctors } from '../data';
import { ViewState } from '../types';

interface DoctorsViewProps {
  setView: (view: ViewState) => void;
}

export default function DoctorsView({ setView }: DoctorsViewProps) {
  const [activeDepartment, setActiveDepartment] = useState<string>('all');

  const filteredDoctors = activeDepartment === 'all' 
    ? doctors 
    : doctors.filter(d => d.departmentId === activeDepartment);

  return (
    <div className="pb-24">
      <PageHeader 
        badge="Our Team"
        title="Meet Our Specialists"
        description="Our team of dedicated professionals provides comprehensive care in a variety of medical specialties."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter Navigation */}
        <div className="mb-12 overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex space-x-3 justify-start lg:justify-center min-w-max">
            <button
              onClick={() => setActiveDepartment('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                activeDepartment === 'all' 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Specialists
            </button>
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeDepartment === dept.id 
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDoctors.map((doctor) => {
              const deptName = departments.find(d => d.id === doctor.departmentId)?.name || 'General';
              return (
                <motion.div
                  key={doctor.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={doctor.imageUrl} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">{deptName}</div>
                    <h3 className="text-2xl font-bold font-heading text-slate-900 mb-1">{doctor.name}</h3>
                    <p className="text-slate-600 mb-4">{doctor.specialty}</p>
                    
                    <div className="pt-4 border-t border-slate-100 space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Experience:</span>
                        <span className="font-medium text-slate-800">{doctor.experience}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Education:</span>
                        <span className="font-medium text-slate-800">{doctor.education}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setView('appointment')}
                      className="w-full py-2.5 bg-slate-50 hover:bg-brand-50 text-brand-700 font-semibold rounded-lg border border-slate-200 hover:border-brand-200 transition-colors"
                    >
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredDoctors.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-lg">
            No doctors found for this department.
          </div>
        )}
      </div>
    </div>
  );
}
