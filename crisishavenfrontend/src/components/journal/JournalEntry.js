import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, Sparkles, MessageCircle } from 'lucide-react';

const JournalEntry = ({ entry, onDelete, getEmotionIcon, getEmotionColor }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className="card-3d overflow-hidden"
    >
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <motion.span 
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ duration: 0.3 }}
              className={`text-4xl ${getEmotionColor(entry.emotion)}`}
            >
              {getEmotionIcon(entry.emotion)}
            </motion.span>
            <div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(entry.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEmotionColor(entry.emotion)}`}>
                  {entry.emotion}
                </span>
                {entry.sentiment && (
                  <span className="text-xs text-gray-400">
                    Sentiment: {entry.sentiment > 0 ? '+' : ''}{entry.sentiment.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(entry.id)}
            className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Journal Content */}
        <div className="mb-6">
          <p className="text-gray-100 leading-relaxed text-lg whitespace-pre-wrap">
            {entry.content}
          </p>
        </div>
        
        {/* AI Analysis */}
        {entry.aiSummary && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <div className="flex-1">
                <h4 className="text-primary-400 font-semibold text-sm mb-1 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>AI Analysis</span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {entry.aiSummary}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default JournalEntry; 