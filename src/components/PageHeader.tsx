import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export default function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 py-16 md:py-20 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {badge && (
            <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold tracking-wide uppercase mb-4">
              {badge}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-900 mb-6">{title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </div>
  );
}
