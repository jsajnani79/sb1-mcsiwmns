import React from 'react';
import { StudiesView } from './components/studies/StudiesView';
import { AdminView } from './components/admin/AdminView';
import { ParticipantProfile } from './components/profile/ParticipantProfile';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const [view, setView] = React.useState('studies');

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (['studies', 'profile', 'admin'].includes(hash)) {
        setView(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Handle initial hash

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header currentView={view} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {view === 'studies' && <StudiesView />}
          {view === 'profile' && <ParticipantProfile />}
          {view === 'admin' && <AdminView />}
        </div>
      </main>

      <Footer />
    </div>
  );
}