import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import OnlineUsersSidebar from '../components/peer-chat/OnlineUsersSidebar';
import ChatArea from '../components/peer-chat/ChatArea';
import SafetyNotice from '../components/peer-chat/SafetyNotice';

const PeerChat = () => {
  return (
    <div className="min-h-screen bg-gradient-hero mt-32 font-inter relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary-500/20 rounded-full animate-float-3d"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-40 right-20 w-24 h-24 bg-secondary-500/20 rounded-full animate-rotate-3d"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -30, 0], rotate: [0, 90, 180] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-accent-500/20 rounded-full animate-wave-3d"
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], x: [0, Math.sin(i) * 20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            className="absolute w-2 h-2 bg-primary-500 rounded-full"
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 180 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl mb-6 transform-3d"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold text-gradient mb-4"
            >
              Peer Support Chat
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Connect anonymously with others who understand. Share experiences, 
              offer support, and find community in a safe, moderated environment.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Online Users Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-1"
            >
              <OnlineUsersSidebar />
            </motion.div>

            {/* Chat Area */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-3"
            >
              <ChatArea />
            </motion.div>
          </div>

          {/* Safety Notice */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8"
          >
            <SafetyNotice />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PeerChat; 