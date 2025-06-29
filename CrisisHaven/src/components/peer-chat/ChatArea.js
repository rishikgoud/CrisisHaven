import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Heart,
  Smile,
  Shield,
  Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';

const ChatArea = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for demonstration
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'Alex',
        content: 'Hey everyone! How are you feeling today?',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        isOwn: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Hi Alex! I\'m doing okay, thanks for asking. How about you?',
        timestamp: new Date(Date.now() - 240000),
        type: 'text',
        isOwn: true
      },
      {
        id: 3,
        sender: 'Sam',
        content: 'Feeling a bit anxious today, but trying to stay positive ✨',
        timestamp: new Date(Date.now() - 180000),
        type: 'text',
        isOwn: false
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(false);

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        'That\'s really interesting! Thanks for sharing.',
        'I can relate to that feeling.',
        'You\'re not alone in this.',
        'That sounds challenging. How are you coping?',
        'I appreciate you opening up about this.',
        'Sending you positive vibes! ✨',
        'That\'s a great perspective.',
        'I\'m here to listen if you need to talk more.'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const randomUsers = ['Alex', 'Sam', 'Jordan', 'Taylor'];
      const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
      
      const responseMessage = {
        id: Date.now() + 1,
        sender: randomUser,
        content: randomResponse,
        timestamp: new Date(),
        type: 'text',
        isOwn: false
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'Unmuted' : 'Muted');
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    toast.success(isVoiceEnabled ? 'Voice disabled' : 'Voice enabled');
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card-3d h-[600px] flex flex-col relative overflow-hidden group"
    >
      {/* Card glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Peer Support Chat
                </h3>
                <p className="text-sm text-gray-400">
                  Anonymous peer support environment
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleVoice}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isVoiceEnabled 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                {isVoiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isMuted 
                    ? 'bg-crisis-500/20 text-crisis-400' 
                    : 'bg-gray-800/50 text-gray-400'
                }`}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-800/50 text-gray-400 rounded-lg transition-all duration-300"
              >
                <Settings className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
                message.isOwn 
                  ? 'bg-primary-500/20 border border-primary-500/30' 
                  : 'bg-gray-800/50 border border-gray-700/50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-white">{message.content}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800/50 border border-gray-700/50 p-4 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm text-gray-400">Someone is typing...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  setIsTyping(true);
                  setTimeout(() => setIsTyping(false), 1000);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm resize-none"
                rows="1"
              />
            </div>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Anonymous & Secure</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Smile className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatArea; 