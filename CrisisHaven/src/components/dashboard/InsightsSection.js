import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const InsightsSection = ({ insights }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="mb-12"
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white">AI Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            className={`card-3d p-6 border-l-4 ${
              insight.type === 'positive' ? 'border-green-500' :
              insight.type === 'warning' ? 'border-yellow-500' :
              insight.type === 'danger' ? 'border-red-500' :
              'border-blue-500'
            }`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{insight.icon}</span>
              <div>
                <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {insights.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="card-3d p-12 text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="w-20 h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-gray-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-300 mb-4">No Insights Yet</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Write more journal entries to get personalized insights and recommendations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/journal'}
            className="btn-primary"
          >
            Start Journaling
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InsightsSection; 