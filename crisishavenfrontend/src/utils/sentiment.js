// src/utils/sentiment.js
// Backend Sentiment/Emotion Analysis Utility

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

/**
 * Analyze sentiment/emotion of a message using backend API
 * @param {string} text - The message to analyze
 * @returns {Promise<{emotion: string, score: number, summary: string}>} - Analysis result
 */
export async function analyzeSentiment(text) {
  if (!text || text.trim().length === 0) {
    return {
      emotion: 'neutral',
      score: 0,
      summary: 'No text provided for analysis.'
    };
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/sentiment/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      console.error('Backend sentiment analysis failed:', response.status, response.statusText);
      throw new Error('Backend API error');
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Sentiment analysis failed');
    }
    
    // Data format: {emotions: [{label: 'joy', score: 0.8}, ...]}
    const emotions = data.emotions || [];
    
    if (emotions.length === 0) {
      throw new Error('No emotions detected');
    }

    // Get the top emotion
    const topEmotion = emotions.reduce((max, curr) => (curr.score > max.score ? curr : max), emotions[0]);
    
    // Calculate sentiment score (positive emotions = positive score, negative emotions = negative score)
    const positiveEmotions = ['joy', 'love', 'surprise'];
    const negativeEmotions = ['sadness', 'anger', 'fear', 'disgust'];
    const neutralEmotions = ['neutral'];
    
    let sentimentScore = 0;
    if (positiveEmotions.includes(topEmotion.label)) {
      sentimentScore = topEmotion.score;
    } else if (negativeEmotions.includes(topEmotion.label)) {
      sentimentScore = -topEmotion.score;
    } else {
      sentimentScore = 0;
    }

    // Generate AI summary based on emotion and content
    const summary = generateAISummary(text, topEmotion.label, sentimentScore);

    return {
      emotion: topEmotion.label,
      score: sentimentScore,
      summary: summary
    };

  } catch (err) {
    console.error('Sentiment analysis failed:', err);
    // Provide intelligent fallback based on text content
    return generateFallbackAnalysis(text);
  }
}

/**
 * Generate fallback analysis when API fails
 * @param {string} text - The journal entry text
 * @returns {Object} Fallback analysis result
 */
function generateFallbackAnalysis(text) {
  const lowerText = text.toLowerCase();
  
  // Simple keyword-based emotion detection
  let emotion = 'neutral';
  let score = 0;
  
  // Positive keywords
  const positiveWords = ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'love', 'good', 'better', 'improved', 'grateful', 'blessed', 'thankful'];
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  
  // Negative keywords
  const negativeWords = ['sad', 'angry', 'fear', 'anxious', 'depressed', 'stressed', 'worried', 'scared', 'terrible', 'awful', 'bad', 'hurt', 'pain', 'crying', 'tears'];
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  // Stress/anxiety keywords
  const stressWords = ['stress', 'stressed', 'anxiety', 'anxious', 'overwhelmed', 'pressure', 'tension', 'worried', 'concerned'];
  const stressCount = stressWords.filter(word => lowerText.includes(word)).length;
  
  // Depression keywords
  const depressionWords = ['depressed', 'depression', 'sad', 'hopeless', 'worthless', 'empty', 'numb', 'tired', 'exhausted'];
  const depressionCount = depressionWords.filter(word => lowerText.includes(word)).length;

  // Determine emotion and score
  if (stressCount > 0) {
    emotion = 'anxiety';
    score = -0.6;
  } else if (depressionCount > 0) {
    emotion = 'depression';
    score = -0.7;
  } else if (negativeCount > positiveCount) {
    emotion = 'sadness';
    score = -0.5;
  } else if (positiveCount > negativeCount) {
    emotion = 'joy';
    score = 0.5;
  } else {
    emotion = 'neutral';
    score = 0;
  }

  const summary = generateAISummary(text, emotion, score);
  
  return {
    emotion: emotion,
    score: score,
    summary: summary
  };
}

/**
 * Generate AI summary based on emotion and content
 * @param {string} text - The journal entry text
 * @param {string} emotion - The detected emotion
 * @param {number} score - The sentiment score
 * @returns {string} - AI generated summary
 */
function generateAISummary(text, emotion, score) {
  const emotionInsights = {
    joy: 'You seem to be experiencing positive emotions. This is great for your mental well-being!',
    sadness: 'You appear to be feeling down. Remember that it\'s okay to feel sad, and these feelings are temporary.',
    anger: 'You seem to be feeling frustrated or angry. Consider taking deep breaths or talking to someone you trust.',
    fear: 'You appear to be feeling anxious or fearful. Try to focus on what you can control and practice self-care.',
    surprise: 'You seem to be experiencing unexpected emotions or situations. Take time to process these feelings.',
    disgust: 'You appear to be feeling repulsed or uncomfortable. Consider what\'s causing this reaction.',
    neutral: 'Your entry shows a balanced emotional state. This can be a sign of emotional stability.',
    love: 'You seem to be experiencing feelings of love or affection. These positive emotions are wonderful!',
    anxiety: 'You appear to be feeling stressed or anxious. Remember to breathe deeply and take things one step at a time.',
    depression: 'You seem to be experiencing difficult emotions. Please know that you\'re not alone and help is available.'
  };

  const sentimentInsights = {
    positive: 'Your overall sentiment is positive, which is excellent for your mental health journey.',
    negative: 'Your sentiment suggests you might be going through a difficult time. Remember, seeking support is a sign of strength.',
    neutral: 'Your emotional state appears balanced. This can be a good foundation for reflection and growth.'
  };

  const sentimentType = score > 0.1 ? 'positive' : score < -0.1 ? 'negative' : 'neutral';
  
  const emotionInsight = emotionInsights[emotion] || 'Thank you for sharing your thoughts and feelings.';
  const sentimentInsight = sentimentInsights[sentimentType];
  
  return `${emotionInsight} ${sentimentInsight} Continue journaling to track your emotional journey.`;
}

/**
 * Get the top emotion label from the analysis
 * @param {Array} emotions
 * @returns {string}
 */
export function getTopEmotion(emotions) {
  if (!emotions || emotions.length === 0) return 'neutral';
  return emotions.reduce((max, curr) => (curr.score > max.score ? curr : max), emotions[0]).label;
} 