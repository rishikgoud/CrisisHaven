import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Heart, 
  Activity,
  Sparkles,
  MessageCircle,
  Calendar,
  TrendingUp
} from 'lucide-react';
import JournalEntry from '../components/journal/JournalEntry';
import { analyzeSentiment } from '../utils/sentiment';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [moodStats, setMoodStats] = useState({
    mostCommonEmotion: 'neutral',
    averageSentiment: 0,
    totalEntries: 0
  });

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(savedEntries);
    calculateMoodStats(savedEntries);
  }, []);

  const calculateMoodStats = (entriesList) => {
    if (entriesList.length === 0) {
      setMoodStats({
        mostCommonEmotion: 'neutral',
        averageSentiment: 0,
        totalEntries: 0
      });
      return;
    }

    const emotions = entriesList.map(entry => entry.emotion);
    const emotionCounts = emotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});

    const mostCommonEmotion = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    const averageSentiment = entriesList.reduce((sum, entry) => sum + entry.sentiment, 0) / entriesList.length;

    setMoodStats({
      mostCommonEmotion,
      averageSentiment,
      totalEntries: entriesList.length
    });
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.trim()) return;

    const sentiment = await analyzeSentiment(currentEntry);
    const emotion = sentiment.emotion;
    
    const newEntry = {
      id: Date.now(),
      content: currentEntry,
      timestamp: new Date().toISOString(),
      sentiment: sentiment.score,
      emotion: emotion,
      aiSummary: sentiment.summary
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    setCurrentEntry('');
    setIsWriting(false);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    calculateMoodStats(updatedEntries);
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    calculateMoodStats(updatedEntries);
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      joy: '😊',
      sadness: '😢',
      anger: '😠',
      fear: '😨',
      surprise: '😲',
      disgust: '🤢',
      neutral: '😐',
      anxiety: '😰',
      depression: '😔',
      hope: '✨'
    };
    return icons[emotion] || '📝';
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      joy: 'text-yellow-400',
      sadness: 'text-blue-400',
      anger: 'text-red-400',
      fear: 'text-purple-400',
      surprise: 'text-orange-400',
      disgust: 'text-green-400',
      neutral: 'text-gray-400',
      anxiety: 'text-pink-400',
      depression: 'text-indigo-400',
      hope: 'text-emerald-400'
    };
    return colors[emotion] || 'text-gray-400';
  };

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
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
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
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold text-gradient mb-4"
            >
              Mental Health Journal
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Write about your thoughts, feelings, and experiences. Our AI will analyze your emotions 
              and provide insights to help you understand your mental health journey.
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-3d p-8"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Total Entries</p>
                  <p className="text-4xl font-bold text-white">{entries.length}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-3d p-8"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">Most Common Emotion</p>
                  <p className="text-2xl font-bold text-white flex items-center space-x-2">
                    <span className="text-3xl">{getEmotionIcon(moodStats.mostCommonEmotion)}</span>
                    <span className="capitalize">{moodStats.mostCommonEmotion}</span>
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card-3d p-8"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Activity className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-gray-300 text-sm font-medium">This Week</p>
                  <p className="text-4xl font-bold text-white">
                    {entries.filter(entry => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(entry.timestamp) > weekAgo;
                    }).length}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* New Entry Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="card-3d p-8 mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Plus className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">New Entry</h2>
            </div>
            
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                onFocus={() => setIsWriting(true)}
                placeholder="How are you feeling today? What's on your mind? Write freely about your thoughts, emotions, and experiences..."
                className="w-full h-40 p-6 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </motion.div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-300 text-sm">
                {currentEntry.length} characters
              </p>
              <div className="space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentEntry('');
                    setIsWriting(false);
                  }}
                  className="btn-outline"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Entry
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Journal Entries */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4 mb-8">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">Your Journal Entries</h2>
            </div>

            {entries.length === 0 ? (
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
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4">Start Your Journaling Journey</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Write your first entry to begin tracking your mental health journey. 
                  Our AI will analyze your emotions and provide insights.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('textarea').focus()}
                  className="btn-primary"
                >
                  Write Your First Entry
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <JournalEntry 
                      entry={entry} 
                      onDelete={handleDeleteEntry}
                      getEmotionIcon={getEmotionIcon}
                      getEmotionColor={getEmotionColor}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Journal; 