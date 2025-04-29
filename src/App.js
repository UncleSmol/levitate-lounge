import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
import Home from './components/home/Home';
import AboutUs from './components/about/AboutUs';
import Membership from './components/membership/Membership';
import Lounge from './components/lounge/Lounge';
import ContactUs from './components/contact/ContactUs';
import Auth from './components/auth/Auth'; // Add this import
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);  // Add this line
  const [user, setUser] = useState(null);  // Add this for user state

  const handleAuthClose = () => {
    setShowAuth(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const navigateTo = (page) => {
    // Update navigation to work with GitHub Pages
    const basePath = process.env.NODE_ENV === 'production' 
      ? '/levitate-lounge' 
      : '';
    window.location.hash = `${basePath}${page}`;
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      // Remove basePath from hash if present
      const basePath = process.env.NODE_ENV === 'production' 
        ? '/levitate-lounge' 
        : '';
      const page = hash.replace(basePath, '') || 'home';
      
      if (page === 'signin') {
        setShowAuth(true);
      } else {
        setCurrentPage(page);
        setShowAuth(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about': return <AboutUs onNavigate={navigateTo} />;
      case 'membership': return <Membership onNavigate={navigateTo} />;
      case 'lounge': return <Lounge onNavigate={navigateTo} />;
      case 'contact': return <ContactUs onNavigate={navigateTo} />;
      case 'home':
      default: return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      <Header 
        user={user} 
        onSignIn={() => setShowAuth(true)}
        onSignOut={() => setUser(null)}
      />
      <main className="main-content">
        {renderCurrentPage()}
        {showAuth && <Auth onClose={handleAuthClose} onLogin={handleLogin} />}
      </main>
      <ScrollToTop />
    </div>
  );
}

export default App;
