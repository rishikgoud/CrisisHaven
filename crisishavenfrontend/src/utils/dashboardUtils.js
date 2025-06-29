// Dashboard utility functions for analytics and data processing

/**
 * Calculate analytics from journal entries
 * @param {Array} entriesList - Array of journal entries
 * @param {string} timeRange - Time range filter (week, month, year)
 * @returns {Object} Analytics object with calculated metrics
 */
export const calculateAnalytics = (entriesList, timeRange) => {
  if (entriesList.length === 0) {
    return {
      totalEntries: 0,
      averageMood: 0,
      mostCommonEmotion: 'neutral',
      moodTrend: 'stable',
      riskLevel: 'low',
      insights: []
    };
  }

  // Filter entries based on time range
  const now = new Date();
  const filteredEntries = entriesList.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const diffTime = Math.abs(now - entryDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (timeRange) {
      case 'week': return diffDays <= 7;
      case 'month': return diffDays <= 30;
      case 'year': return diffDays <= 365;
      default: return true;
    }
  });

  // Calculate basic stats
  const totalEntries = filteredEntries.length;
  const averageMood = filteredEntries.reduce((sum, entry) => sum + entry.sentiment, 0) / totalEntries;
  
  // Most common emotion
  const emotionCounts = filteredEntries.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});
  const mostCommonEmotion = Object.keys(emotionCounts).reduce((a, b) => 
    emotionCounts[a] > emotionCounts[b] ? a : b
  );

  // Mood trend
  const recentEntries = filteredEntries.slice(0, 3);
  const olderEntries = filteredEntries.slice(-3);
  const recentAvg = recentEntries.reduce((sum, entry) => sum + entry.sentiment, 0) / recentEntries.length;
  const olderAvg = olderEntries.reduce((sum, entry) => sum + entry.sentiment, 0) / olderEntries.length;
  const moodTrend = recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';

  // Risk level assessment
  const negativeEntries = filteredEntries.filter(entry => entry.sentiment < -0.3);
  const riskLevel = negativeEntries.length > filteredEntries.length * 0.5 ? 'high' : 
                   negativeEntries.length > filteredEntries.length * 0.2 ? 'medium' : 'low';

  // Generate insights
  const insights = generateInsights(filteredEntries, averageMood, moodTrend, riskLevel);

  return {
    totalEntries,
    averageMood,
    mostCommonEmotion,
    moodTrend,
    riskLevel,
    insights
  };
};

/**
 * Generate insights based on analytics data
 * @param {Array} entries - Filtered journal entries
 * @param {number} avgMood - Average mood score
 * @param {string} trend - Mood trend (improving, declining, stable)
 * @param {string} risk - Risk level (high, medium, low)
 * @returns {Array} Array of insight objects
 */
export const generateInsights = (entries, avgMood, trend, risk) => {
  const insights = [];
  
  // Check for specific emotions in entries
  const hasStress = entries.some(entry => entry.emotion === 'anxiety' || entry.emotion === 'fear');
  const hasDepression = entries.some(entry => entry.emotion === 'depression' || entry.emotion === 'sadness');
  const hasPositive = entries.some(entry => entry.emotion === 'joy' || entry.emotion === 'love');
  
  if (hasStress) {
    insights.push({
      type: 'warning',
      icon: '😰',
      title: 'Stress Detected',
      description: 'We\'ve noticed stress in your entries. Consider practicing deep breathing or talking to someone you trust.'
    });
  }
  
  if (hasDepression) {
    insights.push({
      type: 'danger',
      icon: '😔',
      title: 'Low Mood Patterns',
      description: 'You\'ve been experiencing difficult emotions. Remember, you\'re not alone and professional help is available.'
    });
  }
  
  if (hasPositive) {
    insights.push({
      type: 'positive',
      icon: '😊',
      title: 'Positive Moments',
      description: 'Great! You\'ve had some positive experiences. Focus on these moments and what made them special.'
    });
  }
  
  if (avgMood > 0.3) {
    insights.push({
      type: 'positive',
      icon: '😊',
      title: 'Positive Mood Trend',
      description: 'Your overall mood has been positive. Keep up the great work!'
    });
  } else if (avgMood < -0.3) {
    insights.push({
      type: 'warning',
      icon: '😔',
      title: 'Low Mood Detected',
      description: 'Consider reaching out for support or trying some self-care activities.'
    });
  }

  if (trend === 'improving') {
    insights.push({
      type: 'positive',
      icon: '📈',
      title: 'Mood Improving',
      description: 'Your mood has been getting better over time. This is excellent progress!'
    });
  } else if (trend === 'declining') {
    insights.push({
      type: 'warning',
      icon: '📉',
      title: 'Mood Declining',
      description: 'Your mood has been declining. Consider talking to someone you trust.'
    });
  }

  if (risk === 'high') {
    insights.push({
      type: 'danger',
      icon: '⚠️',
      title: 'High Risk Level',
      description: 'We\'ve detected concerning patterns. Please consider professional support.'
    });
  }

  if (entries.length < 3) {
    insights.push({
      type: 'info',
      icon: '📝',
      title: 'Getting Started',
      description: 'You\'re just beginning your journaling journey! Write a few more entries to get personalized insights.'
    });
  } else if (entries.length < 7) {
    insights.push({
      type: 'info',
      icon: '📊',
      title: 'Building Patterns',
      description: 'Keep journaling regularly to see clearer patterns in your emotional journey.'
    });
  }

  // Add general wellness tips
  if (entries.length > 0) {
    insights.push({
      type: 'info',
      icon: '💡',
      title: 'Journaling Tip',
      description: 'Try writing at the same time each day to build a consistent habit and better track your progress.'
    });
  }

  return insights;
};

/**
 * Generate chart data for mood trends
 * @param {Array} entries - Journal entries
 * @param {string} timeRange - Time range filter
 * @returns {Array} Chart data array
 */
export const getChartData = (entries, timeRange) => {
  const now = new Date();
  const data = [];
  
  let days = 7;
  if (timeRange === 'month') days = 30;
  if (timeRange === 'year') days = 365;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayEntries = entries.filter(entry => 
      entry.timestamp.startsWith(dateStr)
    );
    
    const avgSentiment = dayEntries.length > 0 
      ? dayEntries.reduce((sum, entry) => sum + entry.sentiment, 0) / dayEntries.length 
      : 0;
    
    data.push({
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      mood: avgSentiment,
      entries: dayEntries.length
    });
  }
  
  return data;
};

/**
 * Generate emotion distribution data for pie chart
 * @param {Array} entries - Journal entries
 * @returns {Array} Emotion data array
 */
export const getEmotionData = (entries) => {
  const emotionCounts = entries.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(emotionCounts).map(([emotion, count]) => ({
    name: emotion,
    value: count
  }));
};

/**
 * Get emotion icon by emotion name
 * @param {string} emotion - Emotion name
 * @returns {string} Emoji icon
 */
export const getEmotionIcon = (emotion) => {
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

/**
 * Get emotion color by emotion name
 * @param {string} emotion - Emotion name
 * @returns {string} Color hex code
 */
export const getEmotionColor = (emotion) => {
  const colors = {
    joy: '#10B981',
    sadness: '#3B82F6',
    anger: '#EF4444',
    fear: '#8B5CF6',
    surprise: '#F59E0B',
    disgust: '#84CC16',
    neutral: '#6B7280',
    anxiety: '#EC4899',
    depression: '#6366F1',
    hope: '#059669'
  };
  return colors[emotion] || '#6B7280';
}; 