import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import EmergencyButton from './components/ui/EmergencyButton';

// Page Components
import LandingPage from './pages/LandingPage';
import CrisisSupport from './pages/CrisisSupport';
import Blog from './pages/Blog';
import Community from './pages/Community';
import Providers from './pages/Providers';
import Impact from './pages/Impact';
import Organizations from './pages/Organizations';
import AdminCallLogs from './pages/AdminCallLogs';
import Journal from './pages/Journal';
import Dashboard from './pages/Dashboard';
import PeerChat from './pages/PeerChat';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Context
import { CrisisProvider } from './context/CrisisContext';
import { AuthProvider } from './context/AuthContext';

// Hooks
import { useCrisisMode } from './hooks/useCrisisMode';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const { isCrisisMode } = useCrisisMode();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Check for high contrast preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e) => setIsHighContrast(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary-600 mb-2">CrisisHaven</h2>
          <p className="text-gray-600">Loading your safe space...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <CrisisProvider>
        <Router>
          <div className={`min-h-screen ${isHighContrast ? 'high-contrast' : ''} ${isCrisisMode ? 'emergency-mode' : ''}`}>
            <Helmet>
              <title>CrisisHaven - Immediate Crisis Support</title>
              <meta name="description" content="Connect with Haven, our AI companion, for instant triage and human counselor connection. 24/7 free and confidential." />
            </Helmet>

            <Header />
            
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/resources" element={<Navigate to="/blog" replace />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/providers" element={<Providers />} />
                  <Route path="/find-help" element={<Navigate to="/providers" replace />} />
                  <Route path="/impact" element={<Impact />} />
                  <Route path="/organizations" element={<Organizations />} />
                  
                  {/* Protected Routes */}
                  <Route path="/support" element={
                    <ProtectedRoute>
                      <CrisisSupport />
                    </ProtectedRoute>
                  } />
                  <Route path="/crisis-support" element={<Navigate to="/support" replace />} />
                  <Route path="/talk-to-haven" element={<Navigate to="/support" replace />} />
                  <Route path="/journal" element={
                    <ProtectedRoute>
                      <Journal />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/peer-chat" element={
                    <ProtectedRoute>
                      <PeerChat />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/call-logs" element={<AdminCallLogs />} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </main>

            <Footer />
            
            {/* Emergency Button - Always visible, bottom left */}
            <div className="fixed bottom-8 left-8 z-[1100]">
              <EmergencyButton />
            </div>
            {/* Haven Chat widget is handled by public/index.html and always visible bottom right */}
            {/* Toast notifications */}
            <Toaster position="bottom-center" />
          </div>
        </Router>
      </CrisisProvider>
    </AuthProvider>
  );
}

export default App; 