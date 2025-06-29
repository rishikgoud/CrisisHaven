// src/utils/analytics.js
// Analytics and data storage utility for emotion tracking

const STORAGE_KEYS = {
  EMOTION_DATA: 'crisishaven_emotion_data',
  JOURNAL_ENTRIES: 'crisishaven_journal_entries',
  CHAT_HISTORY: 'crisishaven_chat_history'
};

/**
 * Store emotion data for analytics
 * @param {Object} data - Emotion data to store
 */
export const storeEmotionData = (data) => {
  try {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMOTION_DATA) || '[]');
    const newEntry = {
      ...data,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    existingData.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.EMOTION_DATA, JSON.stringify(existingData));
  } catch (error) {
    console.error('Failed to store emotion data:', error);
  }
};

/**
 * Get emotion data for analytics
 * @param {number} days - Number of days to look back
 * @returns {Array} Emotion data array
 */
export const getEmotionData = (days = 30) => {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMOTION_DATA) || '[]');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.filter(entry => new Date(entry.timestamp) > cutoffDate);
  } catch (error) {
    console.error('Failed to get emotion data:', error);
    return [];
  }
};

/**
 * Get emotion statistics
 * @returns {Object} Emotion statistics
 */
export const getEmotionStats = () => {
  const data = getEmotionData();
  const emotionCounts = {};
  let totalEntries = 0;

  data.forEach(entry => {
    const emotion = entry.emotion || 'neutral';
    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    totalEntries++;
  });

  const mostCommonEmotion = Object.keys(emotionCounts).reduce((a, b) => 
    emotionCounts[a] > emotionCounts[b] ? a : b, 'neutral'
  );

  return {
    totalEntries,
    emotionCounts,
    mostCommonEmotion,
    averageMood: mostCommonEmotion
  };
};

/**
 * Get weekly emotion trends
 * @returns {Array} Weekly emotion data
 */
export const getWeeklyTrends = () => {
  const data = getEmotionData(7);
  const weeklyData = {};
  
  data.forEach(entry => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    if (!weeklyData[date]) {
      weeklyData[date] = { emotions: [], count: 0 };
    }
    weeklyData[date].emotions.push(entry.emotion || 'neutral');
    weeklyData[date].count++;
  });

  return Object.keys(weeklyData).map(date => ({
    date,
    emotions: weeklyData[date].emotions,
    count: weeklyData[date].count,
    dominantEmotion: getMostFrequent(weeklyData[date].emotions)
  }));
};

/**
 * Get most frequent emotion from array
 * @param {Array} emotions - Array of emotions
 * @returns {string} Most frequent emotion
 */
const getMostFrequent = (emotions) => {
  const counts = {};
  emotions.forEach(emotion => {
    counts[emotion] = (counts[emotion] || 0) + 1;
  });
  return Object.keys(counts).reduce((a, b) => 
    counts[a] > counts[b] ? a : b, 'neutral'
  );
};

/**
 * Calculate risk score based on emotions
 * @returns {number} Risk score (0-100)
 */
export const calculateRiskScore = () => {
  const data = getEmotionData(7); // Last 7 days
  let riskScore = 0;
  
  data.forEach(entry => {
    const emotion = entry.emotion || 'neutral';
    switch (emotion) {
      case 'sadness':
        riskScore += 10;
        break;
      case 'anger':
        riskScore += 15;
        break;
      case 'fear':
        riskScore += 20;
        break;
      case 'joy':
        riskScore -= 5;
        break;
      default:
        riskScore += 0;
    }
  });

  return Math.max(0, Math.min(100, riskScore));
};

/**
 * Get crisis alerts based on recent emotions
 * @returns {Array} Array of crisis alerts
 */
export const getCrisisAlerts = () => {
  const data = getEmotionData(1); // Last 24 hours
  const alerts = [];
  
  const highRiskEmotions = data.filter(entry => 
    ['sadness', 'anger', 'fear'].includes(entry.emotion)
  );

  if (highRiskEmotions.length >= 3) {
    alerts.push({
      type: 'high_risk',
      message: 'Multiple negative emotions detected in the last 24 hours',
      severity: 'high'
    });
  }

  if (data.filter(entry => entry.emotion === 'sadness').length >= 2) {
    alerts.push({
      type: 'depression_risk',
      message: 'Signs of depression detected',
      severity: 'medium'
    });
  }

  return alerts;
}; 