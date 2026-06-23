import { motion } from 'motion/react';
import PageHeader from '../components/PageHeader';
import { departments } from '../data';
import { HeartPulse, Brain, Baby, Bone, Activity, Ambulance, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface DepartmentsViewProps {
  setView: (view: ViewState) => void;
}

// Icon mapping helper
const getIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Brain': return <Brain className={className} />;
    case 'Baby': return <Baby className={className} />;
    case 'Bone': return <Bone className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Ambulance': return <Ambulance className={className} />;
    default: return <HeartPulse className={className} />;
  }
};

export default function DepartmentsView({ setView }: DepartmentsViewProps) {
  return (
    <div className="pb-24">
      <PageHeader 
        badge="Our Services"
        title="Centers of Excellence"
        description="We offer a comprehensive range of medical services across various specialties. Our highly skilled doctors and nursing staff ensure the best outcomes."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, idx) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors z-10 w-full h-full"></div>
                <img 
                  src={dept.imageUrl} 
                  alt={dept.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-[-20px] right-6 z-20 bg-white p-4 rounded-xl shadow-lg">
                  {getIcon(dept.icon, "w-8 h-8 text-brand-600")}
                </div>
              </div>
              <div className="p-8 pt-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-3">{dept.name}</h3>
                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">{dept.description}</p>
                
                <button 
                  onClick={() => setView('doctors')} 
                  className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-800 transition-colors group-hover:underline"
                >
                  View Specialists
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
