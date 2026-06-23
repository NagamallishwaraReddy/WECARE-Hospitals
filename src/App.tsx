import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import DepartmentsView from './views/DepartmentsView';
import DoctorsView from './views/DoctorsView';
import AppointmentView from './views/AppointmentView';
import AuthView from './views/AuthView';
import ProfileView from './views/ProfileView';
import { ViewState } from './types';
import { AnimatePresence, motion } from 'motion/react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<ViewState | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBookingRequest = () => {
    if (user) {
      setCurrentView('appointment');
    } else {
      setRedirectAfterLogin('appointment');
      setCurrentView('auth');
    }
  };

  const handleSetView = (view: ViewState) => {
    if (view === 'appointment' && !user) {
      setRedirectAfterLogin('appointment');
      setCurrentView('auth');
      return;
    }
    if (view === 'profile' && !user) {
      setCurrentView('auth');
      return;
    }
    setCurrentView(view);
  };

  // Helper to render the active view with simple fade animations
  const renderView = () => {
    if (loading) {
      return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
    }

    switch (currentView) {
      case 'home': return <HomeView setView={handleSetView} />;
      case 'about': return <AboutView />;
      case 'departments': return <DepartmentsView setView={handleSetView} />;
      case 'doctors': return <DoctorsView setView={handleSetView} />;
      case 'appointment': return <AppointmentView user={user!} setView={handleSetView} />;
      case 'auth': return <AuthView setView={handleSetView} redirectTo={redirectAfterLogin} />;
      case 'profile': return <ProfileView user={user!} setView={handleSetView} />;
      default: return <HomeView setView={handleSetView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation currentView={currentView} setView={handleSetView} user={user} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setView={handleSetView} />
    </div>
  );
}
