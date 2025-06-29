import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Video, VideoOff, X, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogTitle } from '@headlessui/react';
import { initiateWebCall, initiatePhoneCall, getEmergencyContacts, updateSessionStatus } from '../../services/apiService';
import socketService from '../../services/socketService';
import toast from 'react-hot-toast';

const CallModal = ({ isOpen, onClose }) => {
  const [phoneInput, setPhoneInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [callType, setCallType] = useState(null); // 'web' or 'phone'
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, connected, failed, ended
  const [sessionId, setSessionId] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState(null);

  // Load emergency contacts on mount
  useEffect(() => {
    const loadEmergencyContacts = async () => {
      try {
        const contacts = await getEmergencyContacts();
        setEmergencyContacts(contacts);
      } catch (error) {
        console.error('Failed to load emergency contacts:', error);
      }
    };
    
    if (isOpen) {
      loadEmergencyContacts();
    }
  }, [isOpen]);

  // Socket.IO connection and event handling
  useEffect(() => {
    if (isOpen) {
      // Connect to socket
      socketService.connect();
      
      // Listen for status updates
      const handleStatusUpdate = (data) => {
        if (data.sessionId === sessionId) {
          setCallStatus(data.status);
          if (data.message) {
            toast.success(data.message);
          }
        }
      };

      const handleConnection = (data) => {
        console.log('Socket connected:', data);
      };

      const handleDisconnection = (data) => {
        console.log('Socket disconnected:', data);
        if (data.reason === 'io server disconnect') {
          toast.error('Connection lost. Trying to reconnect...');
        }
      };

      socketService.on('status-updated', handleStatusUpdate);
      socketService.on('connection', handleConnection);
      socketService.on('disconnection', handleDisconnection);

      // Cleanup listeners on unmount
      return () => {
        socketService.off('status-updated', handleStatusUpdate);
        socketService.off('connection', handleConnection);
        socketService.off('disconnection', handleDisconnection);
      };
    }
  }, [isOpen, sessionId]);

  // Join session room when sessionId is set
  useEffect(() => {
    if (sessionId) {
      socketService.joinSession(sessionId);
    }
    
    return () => {
      if (sessionId) {
        socketService.leaveSession(sessionId);
      }
    };
  }, [sessionId]);

  // Timer for call duration
  useEffect(() => {
    let interval;
    if (callStatus === 'connected' && sessionId) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus, sessionId]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleWebCall = async () => {
    setIsLoading(true);
    setCallType('web');
    setCallStatus('connecting');
    
    try {
      const result = await initiateWebCall({
        name: 'Anonymous User',
        email: '',
        phone: ''
      });
      
      if (result.type === 'widget') {
        setCallStatus('connected');
        toast.success('Chat widget opened successfully!');
      } else if (result.type === 'backend' || result.type === 'mock' || result.type === 'mock_fallback') {
        if (result.data && result.data.sessionId) {
          setSessionId(result.data.sessionId);
          setCallStatus('connected');
          
          // Emit status update via socket
          socketService.updateCallStatus(result.data.sessionId, 'connected', 'Web call connected successfully');
          
          if (result.data.webCallUrl) {
            window.open(result.data.webCallUrl, '_blank', 'noopener,noreferrer');
          }
          
          toast.success(result.data.message || 'Web call initiated successfully!');
        } else {
          throw new Error('No session ID received');
        }
      }
      
      // Don't close modal immediately for web calls
    } catch (error) {
      console.error('Web call error:', error);
      setCallStatus('failed');
      
      // Emit failure status via socket
      if (sessionId) {
        socketService.updateCallStatus(sessionId, 'failed', 'Web call failed');
      }
      
      toast.error('Unable to connect via web call. Please try alternative options.');
      showAlternativeOptions();
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setCallType('phone');
    setCallStatus('connecting');
    
    try {
      const result = await initiatePhoneCall(phoneInput, {
        name: 'Anonymous User',
        phone: phoneInput
      });
      
      if (result.type === 'backend' || result.type === 'mock' || result.type === 'mock_fallback') {
        if (result.data && result.data.sessionId) {
          setSessionId(result.data.sessionId);
          setCallStatus('connected');
          
          // Emit status update via socket
          socketService.updateCallStatus(result.data.sessionId, 'connected', 'Phone call initiated');
          
          toast.success(result.data.message || 'Phone call initiated! You will receive a call shortly.');
        } else {
          throw new Error('Failed to initiate phone call');
        }
      }
      
      onClose();
      setPhoneInput('');
    } catch (error) {
      console.error('Phone call error:', error);
      setCallStatus('failed');
      
      // Emit failure status via socket
      if (sessionId) {
        socketService.updateCallStatus(sessionId, 'failed', 'Phone call failed');
      }
      
      toast.error('Unable to initiate phone call. Please try alternative contact methods.');
      showAlternativeOptions();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    if (sessionId) {
      try {
        await updateSessionStatus(sessionId, 'ended', 'User ended call');
        
        // Emit status update via socket
        socketService.updateCallStatus(sessionId, 'ended', 'Call ended by user');
        
        toast.success('Call ended successfully');
      } catch (error) {
        console.error('Failed to end call:', error);
      }
    }
    
    setCallStatus('ended');
    setSessionId(null);
    setCallDuration(0);
    
    setTimeout(() => {
      onClose();
      setCallStatus('idle');
    }, 2000);
  };

  const showAlternativeOptions = () => {
    if (!emergencyContacts) return;
    
    setTimeout(() => {
      toast((t) => (
        <div className="text-sm">
          <p className="font-medium mb-2">Alternative options:</p>
          <div className="space-y-1">
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                const widget = document.querySelector('[data-omnidim-widget]');
                if (widget) widget.click();
              }}
              className="block w-full text-left text-blue-400 hover:text-blue-300"
            >
              • Use Chat Widget (bottom right)
            </button>
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                window.open(`tel:${emergencyContacts.national_crisis_line.number}`, '_self');
              }}
              className="block w-full text-left text-blue-400 hover:text-blue-300"
            >
              • Call {emergencyContacts.national_crisis_line.name}: {emergencyContacts.national_crisis_line.number}
            </button>
            <button 
              onClick={() => {
                toast.dismiss(t.id);
                window.open(`tel:${emergencyContacts.emergency.number}`, '_self');
              }}
              className="block w-full text-left text-red-400 hover:text-red-300"
            >
              • Emergency Services: {emergencyContacts.emergency.number}
            </button>
          </div>
        </div>
      ), { duration: 10000 });
    }, 1000);
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case 'connecting': return 'text-yellow-400';
      case 'connected': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'ended': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    switch (callStatus) {
      case 'connecting': return 'Connecting...';
      case 'connected': return 'Connected';
      case 'failed': return 'Connection Failed';
      case 'ended': return 'Call Ended';
      default: return 'Ready to Connect';
    }
  };

  const getStatusIcon = () => {
    switch (callStatus) {
      case 'connecting': return <Clock className="w-5 h-5 animate-spin" />;
      case 'connected': return <CheckCircle className="w-5 h-5" />;
      case 'failed': return <XCircle className="w-5 h-5" />;
      case 'ended': return <CheckCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-[2000] inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full z-10 animate-glow-3d"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <DialogTitle className="text-xl font-bold text-gray-100">
            Connect to Human Counselor
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Call Status Display */}
        {callStatus !== 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-gray-800 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={getStatusColor()}>
                  {getStatusIcon()}
                </div>
                <div>
                  <div className={`font-medium ${getStatusColor()}`}>
                    {getStatusText()}
                  </div>
                  {sessionId && (
                    <div className="text-xs text-gray-400">
                      Session: {sessionId.slice(0, 8)}...
                    </div>
                  )}
                </div>
              </div>
              {callStatus === 'connected' && callDuration > 0 && (
                <div className="text-sm text-gray-300">
                  {formatDuration(callDuration)}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Call Options */}
        <AnimatePresence>
          {callStatus === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 mb-6"
            >
              {/* Web Call Option */}
              <motion.button
                onClick={handleWebCall}
                disabled={isLoading}
                className={`
                  w-full p-4 rounded-lg border-2 transition-all duration-300
                  ${isLoading && callType === 'web'
                    ? 'border-yellow-500 bg-yellow-500/10 cursor-not-allowed'
                    : 'border-primary-500 hover:border-primary-400 hover:bg-primary-500/10 cursor-pointer'
                  }
                `}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isLoading && callType === 'web' ? 'bg-yellow-500' : 'bg-primary-500'}
                    `}>
                      {isLoading && callType === 'web' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <Video className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-100">Web Call (Browser)</div>
                      <div className="text-sm text-gray-400">Video chat in your browser</div>
                    </div>
                  </div>
                  {isLoading && callType === 'web' && (
                    <div className="text-yellow-400 text-sm">Connecting...</div>
                  )}
                </div>
              </motion.button>

              {/* Phone Call Option */}
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <motion.button
                  type="button"
                  onClick={() => setCallType(callType === 'phone' ? null : 'phone')}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-all duration-300
                    ${callType === 'phone'
                      ? 'border-secondary-500 bg-secondary-500/10'
                      : 'border-gray-600 hover:border-secondary-500 hover:bg-secondary-500/10'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${callType === 'phone' ? 'bg-secondary-500' : 'bg-gray-600'}
                      `}>
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-100">Phone Call</div>
                        <div className="text-sm text-gray-400">Receive a call on your phone</div>
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Phone Input */}
                <AnimatePresence>
                  {callType === 'phone' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-gray-300 text-sm mb-2">
                          Enter your phone number:
                        </label>
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                          placeholder="e.g. +1234567890"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isLoading || !phoneInput.trim()}
                        className={`
                          w-full py-3 rounded-lg font-medium transition-all duration-300
                          ${isLoading
                            ? 'bg-yellow-500 cursor-not-allowed'
                            : 'bg-secondary-500 hover:bg-secondary-600'
                          }
                          text-white
                        `}
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Initiating Call...</span>
                          </div>
                        ) : (
                          'Call Now'
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Call Controls */}
        <AnimatePresence>
          {callStatus === 'connected' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <button
                onClick={handleEndCall}
                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                End Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emergency Contacts */}
        {emergencyContacts && (
          <div className="border-t border-gray-700 pt-4">
            <div className="text-sm text-gray-400 mb-3">Emergency Contacts:</div>
            <div className="space-y-2">
              <button
                onClick={() => window.open(`tel:${emergencyContacts.national_crisis_line.number}`, '_self')}
                className="w-full text-left p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <div className="text-gray-100 font-medium">
                  {emergencyContacts.national_crisis_line.name}
                </div>
                <div className="text-blue-400 text-sm">
                  {emergencyContacts.national_crisis_line.number}
                </div>
              </button>
              <button
                onClick={() => window.open(`tel:${emergencyContacts.emergency.number}`, '_self')}
                className="w-full text-left p-2 rounded hover:bg-gray-800 transition-colors"
              >
                <div className="text-gray-100 font-medium">
                  {emergencyContacts.emergency.name}
                </div>
                <div className="text-red-400 text-sm">
                  {emergencyContacts.emergency.number}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Warning */}
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-300">
              If you're in immediate danger, call 911 or your local emergency services immediately.
            </div>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
};

export default CallModal; 