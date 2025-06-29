import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import dashboard components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import MetricsCards from '../components/dashboard/MetricsCards';
import MoodTrendChart from '../components/dashboard/MoodTrendChart';
import EmotionPieChart from '../components/dashboard/EmotionPieChart';
import InsightsSection from '../components/dashboard/InsightsSection';

// Import utility functions
import { 
  calculateAnalytics, 
  getChartData, 
  getEmotionData, 
  getEmotionIcon, 
  getEmotionColor 
} from '../utils/dashboardUtils';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [analytics, setAnalytics] = useState({
    totalEntries: 0,
    averageMood: 0,
    mostCommonEmotion: 'neutral',
    moodTrend: 'stable',
    riskLevel: 'low',
    insights: []
  });

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(savedEntries);
    const calculatedAnalytics = calculateAnalytics(savedEntries, timeRange);
    setAnalytics(calculatedAnalytics);
  }, [timeRange]);

  // Generate chart data
  const chartData = getChartData(entries, timeRange);
  const emotionData = getEmotionData(entries);

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
          {/* Dashboard Header */}
          <DashboardHeader timeRange={timeRange} setTimeRange={setTimeRange} />

          {/* Metrics Cards */}
          <MetricsCards analytics={analytics} getEmotionIcon={getEmotionIcon} />

          {/* Charts Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            <MoodTrendChart chartData={chartData} />
            <EmotionPieChart emotionData={emotionData} getEmotionColor={getEmotionColor} />
          </motion.div>

          {/* Insights Section */}
          <InsightsSection insights={analytics.insights} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 