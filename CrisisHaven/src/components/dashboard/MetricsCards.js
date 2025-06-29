import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Brain, AlertTriangle } from 'lucide-react';

const MetricsCards = ({ analytics, getEmotionIcon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card-3d p-6"
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Activity className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="text-gray-300 text-sm font-medium">Total Entries</p>
            <p className="text-2xl font-bold text-white">{analytics.totalEntries}</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card-3d p-6"
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="text-gray-300 text-sm font-medium">Average Mood</p>
            <p className="text-2xl font-bold text-white">
              {analytics.averageMood > 0 ? '+' : ''}{analytics.averageMood.toFixed(2)}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card-3d p-6"
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="text-gray-300 text-sm font-medium">Top Emotion</p>
            <p className="text-2xl font-bold text-white flex items-center space-x-2">
              <span className="text-2xl">{getEmotionIcon(analytics.mostCommonEmotion)}</span>
              <span className="capitalize">{analytics.mostCommonEmotion}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className="card-3d p-6"
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
              analytics.riskLevel === 'high' ? 'bg-gradient-to-br from-red-500 to-red-600' :
              analytics.riskLevel === 'medium' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
              'bg-gradient-to-br from-green-500 to-green-600'
            }`}
          >
            <AlertTriangle className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="text-gray-300 text-sm font-medium">Risk Level</p>
            <p className={`text-2xl font-bold capitalize ${
              analytics.riskLevel === 'high' ? 'text-red-400' :
              analytics.riskLevel === 'medium' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {analytics.riskLevel}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MetricsCards; 