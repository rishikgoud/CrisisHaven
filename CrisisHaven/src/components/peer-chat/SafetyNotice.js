import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const SafetyNotice = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card-3d p-6 relative overflow-hidden group"
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-crisis-500 to-crisis-600 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Safety & Privacy</h3>
            <p className="text-gray-300">
              This is a moderated, anonymous peer support environment. 
              If you're in crisis, please contact emergency services or use our crisis support feature.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyNotice; 