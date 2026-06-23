import { motion } from 'motion/react';
import { ArrowRight, UserPlus, Shield, Clock, Heart } from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  setView: (view: ViewState) => void;
}

export default function HomeView({ setView }: HomeViewProps) {
  const features = [
    {
      icon: <UserPlus className="w-8 h-8 text-brand-600" />,
      title: "Top Specialists",
      description: "Our dedicated team of doctors brings decades of experience and expertise.",
    },
    {
      icon: <Clock className="w-8 h-8 text-brand-600" />,
      title: "24/7 Availability",
      description: "Emergency care is always ready. We are here when you need us most.",
    },
    {
      icon: <Shield className="w-8 h-8 text-brand-600" />,
      title: "Advanced Technology",
      description: "Utilizing the latest medical equipment for accurate diagnosis.",
    },
    {
      icon: <Heart className="w-8 h-8 text-brand-600" />,
      title: "Compassionate Care",
      description: "We treat every patient like family, prioritizing your comfort and health.",
    }
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-brand-50/50 block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-24 lg:pt-32 lg:pb-36 flex flex-col lg:flex-row items-center">
          
          <div className="w-full lg:w-1/2 pr-0 lg:pr-12 text-center lg:text-left z-10 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-tight mb-6">
                Your Health is Our <span className="text-brand-600">Top Priority</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience world-class healthcare with compassionate specialists, advanced technology, and personalized treatments designed to help you live your best life.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setView('appointment')}
                  className="px-8 py-3.5 w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium transition-all shadow-lg shadow-brand-200/50 flex items-center justify-center text-lg"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => setView('doctors')}
                  className="px-8 py-3.5 w-full sm:w-auto bg-white border border-slate-200 hover:border-brand-200 hover:bg-brand-50 text-slate-700 rounded-full font-medium transition-colors text-lg"
                >
                  Find a Doctor
                </button>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/10 border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Modern Hospital Setting" 
                className="w-full h-auto object-cover aspect-video lg:aspect-[4/3]"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Quick Info & Features */}
      <section className="-mt-12 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-brand-100 transition-colors"
            >
              <div className="bg-brand-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold font-heading text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-900 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative"
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-700 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10 w-full md:w-2/3 mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Ready to start your health journey?</h2>
            <p className="text-brand-100 text-lg md:text-xl max-w-xl">
              Schedule your appointment online today. Our medical team is ready to provide you with the best care possible.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex justify-center">
            <button 
              onClick={() => setView('appointment')}
              className="px-8 py-4 bg-white text-brand-900 rounded-full font-bold text-lg hover:bg-brand-50 transition-colors shadow-xl w-full sm:w-auto"
            >
              Book Now
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
