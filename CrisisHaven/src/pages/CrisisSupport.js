import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Heart, 
  Users,
  Shield,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';
import EmergencyButton from '../components/ui/EmergencyButton';
import VoiceChat from '../components/support/VoiceChat';
import CallModal from '../components/support/CallModal';

const CrisisSupport = () => {
  const { actions } = useCrisis();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero font-inter relative overflow-hidden">
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

      {/* Emergency Button - bottom left */}
      <div className="fixed bottom-8 left-8 z-[1100]">
        <EmergencyButton />
      </div>

      {/* Main Support UI */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full mt-24 animate-glow-3d"
        >
          <h1 className="text-3xl font-bold text-gradient mb-4 text-center">Talk to Haven</h1>
          <p className="text-gray-300 mb-6 text-center">
            Your AI companion for immediate crisis support. Speak naturally and get compassionate, understanding responses. Available 24/7.
          </p>
          
          {/* Voice Chat Component */}
          <VoiceChat />
          
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={() => setIsCallModalOpen(true)}
              className="btn-primary w-full animate-glow-3d"
            >
              Connect to Human Counselor
            </button>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">How Crisis Support Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'Start', desc: 'Click the button to begin.' },
              { icon: MessageCircle, title: 'Talk', desc: 'Share your feelings with Haven.' },
              { icon: Users, title: 'Connect', desc: 'Get connected to a human counselor.' },
              { icon: Heart, title: 'Support', desc: 'Receive ongoing care and resources.' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                className="card-3d p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg animate-glow-3d">
                  {React.createElement(step.icon, { className: 'w-7 h-7' })}
                </div>
                <h3 className="text-base font-bold text-gray-100 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Impact Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-3xl"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, label: 'Lives Supported', value: '50,000+' },
              { icon: Users, label: 'Counselors', value: '1,200+' },
              { icon: Shield, label: '24/7 Availability', value: 'Always' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                className="card-3d p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-float-3d">
                  {React.createElement(stat.icon, { className: 'w-7 h-7 text-white' })}
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-gray-300 font-medium text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 w-full max-w-3xl mb-24"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">Quick Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/blog" className="card-3d p-6 text-center group hover:scale-105 transition-transform duration-300 animate-glow-3d">
              <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary-500" />
              <div className="font-bold text-gray-100 mb-1">Crisis Blog</div>
              <div className="text-gray-400 text-xs">Guides, tips, and real stories</div>
            </a>
            <a href="/organizations" className="card-3d p-6 text-center group hover:scale-105 transition-transform duration-300 animate-glow-3d">
              <Users className="w-8 h-8 mx-auto mb-2 text-secondary-500" />
              <div className="font-bold text-gray-100 mb-1">Organizations</div>
              <div className="text-gray-400 text-xs">Find professional help</div>
            </a>
            <a href="/providers" className="card-3d p-6 text-center group hover:scale-105 transition-transform duration-300 animate-glow-3d">
              <Phone className="w-8 h-8 mx-auto mb-2 text-accent-500" />
              <div className="font-bold text-gray-100 mb-1">Providers</div>
              <div className="text-gray-400 text-xs">Contact a counselor directly</div>
            </a>
          </div>
        </motion.section>
      </div>

      {/* Call Modal */}
      <CallModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
      />
    </div>
  );
};

export default CrisisSupport; 