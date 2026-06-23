import { motion } from 'motion/react';
import { Award, Users, Stethoscope, CheckCircle2 } from 'lucide-react';

export default function AboutView() {
  const milestones = [
    { year: "2005", title: "Hospital Founded", description: "Started with a vision providing community care." },
    { year: "2010", title: "Expansion Phase", description: "Added specialized cardiology and neurology wings." },
    { year: "2018", title: "Innovation Award", description: "Recognized as leading regional healthcare provider." },
    { year: "2023", title: "Modernization", description: "Complete renovation to state-of-the-art facilities." },
  ];

  return (
    <div className="pb-20">
      {/* Intro section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1538108149393-cebb47ac79de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Hospital exterior or team" 
                className="rounded-3xl shadow-2xl object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">Who We Are</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-6">A Legacy of Medical Excellence and Compassion</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                At WeCare Hospitals, we believe in a holistic approach to healing. Since our inception, we have been committed to providing uncompromised clinical excellence combined with deeply personalized patient care.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Our facilities are equipped with cutting-edge medical technology, and our team comprises internationally recognized specialists who are leaders in their respective fields.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 shrink-0" />
                  <span className="font-medium text-slate-800">Advanced Facilities</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 shrink-0" />
                  <span className="font-medium text-slate-800">24/7 Support</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 shrink-0" />
                  <span className="font-medium text-slate-800">Expert Specialists</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-500 mr-3 shrink-0" />
                  <span className="font-medium text-slate-800">Patient-Centric Approach</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6"
            >
              <Users className="w-12 h-12 mx-auto text-brand-300 mb-4" />
              <div className="text-5xl font-bold font-heading mb-2">50k+</div>
              <div className="text-brand-100 text-lg">Happy Patients</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6"
            >
              <Stethoscope className="w-12 h-12 mx-auto text-brand-300 mb-4" />
              <div className="text-5xl font-bold font-heading mb-2">150+</div>
              <div className="text-brand-100 text-lg">Expert Doctors</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <Award className="w-12 h-12 mx-auto text-brand-300 mb-4" />
              <div className="text-5xl font-bold font-heading mb-2">25+</div>
              <div className="text-brand-100 text-lg">Years of Excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">Our Journey</h2>
            <p className="text-slate-600 text-lg">A brief history of how WeCare Hospitals grew to become a trusted name in healthcare.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative group"
              >
                <div className="text-brand-600 font-bold text-4xl mb-4 font-heading group-hover:text-brand-700 transition-colors">{milestone.year}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{milestone.title}</h4>
                <p className="text-slate-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
