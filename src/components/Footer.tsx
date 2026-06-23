import { HeartPulse, Mail, MapPin, Phone } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  setView: (view: ViewState) => void;
}

export default function Footer({ setView }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-brand-600 p-2 rounded-lg text-white mr-3">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-heading text-white tracking-tight">
                WeCare<span className="text-brand-400 font-medium">Hospitals</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Providing compassionate, world-class healthcare with state-of-the-art facilities and leading medical experts dedicated to your well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-heading tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => setView('home')} className="hover:text-brand-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-brand-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => setView('departments')} className="hover:text-brand-400 transition-colors">Our Departments</button>
              </li>
              <li>
                <button onClick={() => setView('doctors')} className="hover:text-brand-400 transition-colors">Find a Doctor</button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-heading tracking-wide uppercase text-sm">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-brand-500 shrink-0 mt-0.5" />
                <span>123 Health Ave, Medical District<br />Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-brand-500 shrink-0" />
                <span>1-800-WECARE (932273)</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-brand-500 shrink-0" />
                <span>info@wecarehospitals.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 font-heading tracking-wide uppercase text-sm">Working Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-slate-700 pb-2">
                <span>Monday - Friday:</span>
                <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-slate-700 pb-2">
                <span>Saturday - Sunday:</span>
                <span className="text-white font-medium">9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Emergency Service:</span>
                <span className="text-brand-400 font-medium">24/7 Open</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} WeCare Hospitals. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
