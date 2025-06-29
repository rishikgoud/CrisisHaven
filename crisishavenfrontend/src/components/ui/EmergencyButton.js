import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, X, Shield, Heart, Users } from 'lucide-react';

const EmergencyButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      icon: Heart,
      color: 'text-crisis-500',
    },
    {
      name: 'Crisis Text Line',
      number: '741741',
      description: 'Text HOME to connect',
      icon: Shield,
      color: 'text-primary-500',
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Immediate emergency help',
      icon: AlertTriangle,
      color: 'text-crisis-500',
    },
  ];

  const handleEmergencyClick = () => {
    setIsEmergencyMode(true);
    // Add emergency mode logic here
    setTimeout(() => setIsEmergencyMode(false), 5000);
  };

  return (
    <>
      {/* Main Emergency Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {!isExpanded ? (
            <motion.button
              key="main-button"
              onClick={() => setIsExpanded(true)}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-crisis-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse-slow" />
              
              {/* Main button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-crisis-500 to-crisis-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-crisis-500/50 transition-all duration-300 animate-glow-3d">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>

              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-crisis-500 animate-ping opacity-75" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded-menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl" />
              
              {/* Menu container */}
              <div className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-6 min-w-[320px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-crisis-500 to-crisis-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Emergency Support</h3>
                      <p className="text-gray-400 text-sm">Get help immediately</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Emergency contacts */}
                <div className="space-y-3 mb-6">
                  {emergencyContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <motion.a
                        key={contact.name}
                        href={`tel:${contact.number}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-200 group"
                      >
                        <div className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`w-5 h-5 ${contact.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm">{contact.name}</div>
                          <div className="text-gray-400 text-xs">{contact.description}</div>
                        </div>
                        <div className="text-crisis-500 font-bold text-lg">{contact.number}</div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleEmergencyClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                      isEmergencyMode 
                        ? 'bg-crisis-600 animate-pulse-slow' 
                        : 'bg-gradient-to-r from-crisis-500 to-crisis-600 hover:from-crisis-600 hover:to-crisis-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Call CrisisHaven Support</span>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-semibold text-white transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Connect with Community</span>
                    </div>
                  </motion.button>
                </div>

                {/* Warning notice */}
                <div className="mt-4 p-3 bg-crisis-500/10 border border-crisis-500/20 rounded-lg">
                  <p className="text-crisis-500 text-xs text-center">
                    <strong>If you're in immediate danger:</strong> Call 911 or your local emergency services immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Emergency Mode Overlay */}
      <AnimatePresence>
        {isEmergencyMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-crisis-500/20 backdrop-blur-sm z-40"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900/95 backdrop-blur-xl border border-crisis-500/50 rounded-2xl p-8 text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-crisis-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <Phone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Connecting to Support</h3>
                <p className="text-gray-300 mb-4">Please wait while we connect you with a crisis counselor...</p>
                <div className="flex space-x-2 justify-center">
                  <div className="w-2 h-2 bg-crisis-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-crisis-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-crisis-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyButton; 