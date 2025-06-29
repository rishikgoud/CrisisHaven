import React, { useEffect, useState } from 'react';
import { storeEmotionData } from '../../utils/analytics';

/**
 * ChatMessage component
 * @param {string} message - The chat message text
 * @param {string} sender - 'user' or 'ai'
 */
const ChatMessage = ({ message, sender }) => {
  const [emotion, setEmotion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchEmotion = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/sentiment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message })
        });
        const data = await res.json();
        if (isMounted && data.success && data.emotions && data.emotions.length > 0) {
          // Get the top emotion
          const top = data.emotions.reduce((max, curr) => (curr.score > max.score ? curr : max), data.emotions[0]);
          setEmotion(top.label);
          
          // Store emotion data for analytics (only for user messages)
          if (sender === 'user') {
            storeEmotionData({
              emotion: top.label,
              score: top.score,
              message: message,
              source: 'chat',
              sender: sender
            });
          }
        }
      } catch (err) {
        setEmotion('neutral');
      } finally {
        setLoading(false);
      }
    };
    if (message) fetchEmotion();
    return () => { isMounted = false; };
  }, [message, sender]);

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'joy': return '😊';
      case 'sadness': return '😢';
      case 'anger': return '😠';
      case 'fear': return '😨';
      case 'surprise': return '😲';
      case 'disgust': return '🤢';
      case 'neutral': return '😐';
      default: return '🤔';
    }
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'joy': return 'bg-green-100 text-green-800 border-green-200';
      case 'sadness': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'anger': return 'bg-red-100 text-red-800 border-red-200';
      case 'fear': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'surprise': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'disgust': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`flex items-start space-x-3 my-3 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {sender === 'ai' && (
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">H</span>
        </div>
      )}
      
      <div className={`rounded-2xl px-4 py-3 max-w-xs lg:max-w-md ${
        sender === 'user' 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
          : 'bg-white text-gray-800 shadow-md border border-gray-100'
      }`}>
        <div className="text-sm leading-relaxed">{message}</div>
        
        <div className="mt-2 flex items-center space-x-2">
          {loading ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-xs text-gray-400">Analyzing...</span>
            </div>
          ) : (
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getEmotionColor(emotion)}`}>
              <span className="text-sm">{getEmotionIcon(emotion)}</span>
              <span className="capitalize">{emotion || 'neutral'}</span>
            </div>
          )}
        </div>
      </div>
      
      {sender === 'user' && (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">U</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessage; 