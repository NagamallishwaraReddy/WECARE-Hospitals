import { useState } from 'react';
import { ViewState } from '../types';
import { HeartPulse, Menu, X, Phone, Calendar as CalendarIcon, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from 'firebase/auth';
import { auth } from '../firebase';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User | null;
}

export default function Navigation({ currentView, setView, user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Departments', view: 'departments' },
    { label: 'Doctors', view: 'doctors' },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    auth.signOut();
    setView('home');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-900 text-brand-50 text-sm py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> 1-800-WECARE</span>
            <span>Emergency: 911</span>
          </div>
          <div className="flex items-center space-x-4 text-brand-200">
            {user ? (
              <span className="flex items-center">
                Signed in as {user.email}
              </span>
            ) : (
              <span>24/7 Patient Support</span>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="bg-brand-600 p-2 rounded-lg text-white mr-3 group-hover:bg-brand-500 transition-colors">
              <HeartPulse className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold font-heading text-slate-900 tracking-tight">
              WeCare
              <span className="text-brand-600 font-medium">Hospitals</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-base font-medium transition-colors hover:text-brand-600 ${
                  currentView === item.view ? 'text-brand-700 font-semibold border-b-2 border-brand-600 pb-1' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-200">
              {user ? (
                <>
                  <button 
                    onClick={() => handleNavClick('profile')}
                    className="flex justify-center items-center text-slate-600 hover:text-brand-600 transition-colors"
                  >
                    <UserIcon className="w-5 h-5 mr-1" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => handleNavClick('auth')}
                  className="text-slate-600 hover:text-brand-600 transition-colors font-medium"
                >
                  Sign In
                </button>
              )}
              <button 
                onClick={() => handleNavClick('appointment')}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-medium transition-colors shadow-sm flex items-center shadow-brand-200"
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    currentView === item.view ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-slate-100 my-2 pt-2">
                {user ? (
                  <>
                    <button
                      onClick={() => handleNavClick('profile')}
                      className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors text-slate-700 hover:bg-slate-50 flex items-center"
                    >
                      <UserIcon className="w-5 h-5 mr-3" />
                      My Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavClick('auth')}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors text-slate-700 hover:bg-slate-50 flex items-center"
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Sign In
                  </button>
                )}
              </div>

              <div className="pt-4 px-4">
                <button 
                  onClick={() => handleNavClick('appointment')}
                  className="w-full py-3 bg-brand-600 text-white rounded-xl font-medium shadow-sm flex justify-center items-center"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
