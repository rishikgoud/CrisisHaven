import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const DashboardHeader = ({ timeRange, setTimeRange }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <motion.div 
        whileHover={{ scale: 1.05, rotateY: 180 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-2xl mb-6 transform-3d"
      >
        <BarChart3 className="w-10 h-10 text-white" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl font-bold text-gradient mb-4"
      >
        Mental Health Dashboard
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
      >
        Track your emotional journey with detailed analytics and insights. 
        Understand your patterns and progress over time.
      </motion.p>

      {/* Time Range Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex justify-center space-x-4 mt-8"
      >
        {['week', 'month', 'year'].map((range) => (
          <motion.button
            key={range}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              timeRange === range 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default DashboardHeader; 