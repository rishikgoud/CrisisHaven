import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Phone, MessageCircle } from 'lucide-react';
import { startVoiceWidget, openChatWidget } from '../../services/apiService';
import ChatMessage from '../chat/ChatMessage';
import toast from 'react-hot-toast';

const VoiceChat = () => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('idle'); // idle, connecting, listening, connected
  const [audioLevel, setAudioLevel] = useState(0);
  const [useOmniDimension, setUseOmniDimension] = useState(true);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [userSpeech, setUserSpeech] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const audioContextClosedRef = useRef(false);
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Check if OmniDimension widget is available
  const isWidgetAvailable = () => {
    // Check for various widget selectors
    const widgetSelectors = [
      '#omnidimension-web-widget-container',
      '[data-omnidim-widget]',
      '.omnidimension-widget',
      '#omnidim-widget',
      '[id*="omnidim"]',
      '[class*="omnidim"]'
    ];
    
    for (const selector of widgetSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        console.log('Found OmniDimension widget with selector:', selector);
        return true;
      }
    }
    
    // Check for global widget object
    if (window.omnidimensionWidget || window.omnidim || window.omnidimension) {
      console.log('Found OmniDimension global object');
      return true;
    }
    
    return false;
  };

  // Open OmniDimension widget
  const openOmniDimensionWidget = () => {
    console.log('Attempting to open OmniDimension widget...');
    
    // Try multiple approaches to open the widget
    
    // Approach 1: Use global API if available
    if (window.omnidimensionWidget) {
      try {
        console.log('Using omnidimensionWidget.open()');
        window.omnidimensionWidget.open();
        
        // Start voice session after opening
        setTimeout(() => {
          try {
            if (window.omnidimensionWidget.startVoice) {
              window.omnidimensionWidget.startVoice();
              console.log('Started OmniDimension voice session');
            }
          } catch (error) {
            console.log('Failed to start voice session:', error);
          }
        }, 1000);
        
        return true;
      } catch (error) {
        console.log('Failed to open widget via omnidimensionWidget.open()');
      }
    }
    
    // Approach 2: Direct widget element click
    const widgetSelectors = [
      '#omnidimension-web-widget-container',
      '[data-omnidim-widget]',
      '.omnidimension-widget',
      '#omnidim-widget',
      '[id*="omnidim"]',
      '[class*="omnidim"]'
    ];
    
    for (const selector of widgetSelectors) {
      const widget = document.querySelector(selector);
      if (widget) {
        // Try to find and click a button within the widget
        const button = widget.querySelector('button') || 
                      widget.querySelector('[role="button"]') ||
                      widget.querySelector('.widget-button') ||
                      widget.querySelector('.omnidim-button') ||
                      widget.querySelector('.voice-button');
        
        if (button) {
          console.log('Clicking widget button:', button);
          button.click();
          
          // Try to start voice session
          setTimeout(() => {
            const voiceButton = widget.querySelector('.voice-button') || 
                              widget.querySelector('[data-voice]') ||
                              widget.querySelector('.start-voice');
            if (voiceButton) {
              voiceButton.click();
              console.log('Clicked voice button');
            }
          }, 500);
          
          return true;
        } else {
          // If no button found, click the widget itself
          console.log('Clicking widget element directly');
          widget.click();
          return true;
        }
      }
    }
    
    // Approach 3: Dispatch custom event
    try {
      console.log('Dispatching omnidimension-open event');
      document.dispatchEvent(new CustomEvent('omnidimension-open'));
      return true;
    } catch (error) {
      console.log('Failed to dispatch omnidimension-open event');
    }
    
    return false;
  };

  // Initialize OmniDimension widget integration
  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 30; // Check for 30 seconds
    
    const checkWidget = () => {
      checkCount++;
      console.log(`Checking for OmniDimension widget (attempt ${checkCount}/${maxChecks})`);
      
      if (isWidgetAvailable()) {
        setWidgetLoaded(true);
        console.log('OmniDimension widget detected and loaded');
        
        // Set up widget event listeners
        const widget = document.querySelector('#omnidimension-web-widget-container') || 
                      document.querySelector('[data-omnidim-widget]') ||
                      document.querySelector('.omnidimension-widget');
        
        if (widget) {
          // Listen for widget interactions
          widget.addEventListener('click', () => {
            console.log('Widget clicked');
          });
        }
        
        // Listen for OmniDimension events
        document.addEventListener('omnidimension-voice-start', () => {
          console.log('OmniDimension voice started');
          setIsListening(true);
          setConnectionStatus('listening');
        });
        
        document.addEventListener('omnidimension-voice-stop', () => {
          console.log('OmniDimension voice stopped');
          setIsListening(false);
          setConnectionStatus('idle');
        });
        
        document.addEventListener('omnidimension-response', (event) => {
          console.log('OmniDimension response:', event.detail);
          const response = event.detail?.text || event.detail?.message || event.detail?.response || 'I understand. How can I help you further?';
          setAiResponse(response);
          
          // Add to conversation history
          const aiEntry = {
            type: 'ai',
            text: response,
            timestamp: new Date()
          };
          setConversationHistory(prev => [...prev, aiEntry]);
          
          // Speak the response
          speakAIResponse(response);
        });
        
        return; // Stop checking
      }
      
      // If widget not found and we haven't exceeded max checks, try again
      if (checkCount < maxChecks) {
        setTimeout(checkWidget, 1000); // Check again in 1 second
      } else {
        console.log('OmniDimension widget not found after maximum attempts');
        setWidgetLoaded(false);
        toast.error('OmniDimension widget failed to load. You can still use local voice processing.');
      }
    };
    
    checkWidget();
  }, []);

  // Check microphone permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      } catch (error) {
        console.log('Microphone permission not granted:', error);
        setHasPermission(false);
      }
    };
    
    checkPermission();
  }, []);

  // Initialize speech recognition for local fallback
  useEffect(() => {
    if (!useOmniDimension && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Stop after each utterance
      recognitionRef.current.interimResults = false; // Only final results
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.maxAlternatives = 1;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Final transcript:', transcript);
        setUserSpeech(transcript);
        processUserSpeech(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setSpeechError(event.error);
        
        // Handle different error types
        switch (event.error) {
          case 'network':
            toast.error('Network error with speech recognition. Please check your internet connection and try again.');
            break;
          case 'no-speech':
            toast.error('No speech detected. Please try speaking again.');
            break;
          case 'audio-capture':
            toast.error('Microphone access error. Please check your microphone permissions.');
            break;
          case 'not-allowed':
            toast.error('Microphone access denied. Please allow microphone access in your browser.');
            break;
          case 'service-not-allowed':
            toast.error('Speech recognition service not available. Please try again later.');
            break;
          default:
            toast.error(`Speech recognition error: ${event.error}. Please try again.`);
        }
        
        // Don't restart automatically for network errors
        if (event.error !== 'network') {
          // Restart recognition after a short delay for other errors
          setTimeout(() => {
            if (isListening && !useOmniDimension && recognitionRef.current) {
              try {
                recognitionRef.current.start();
                setSpeechError(null);
              } catch (error) {
                console.log('Speech recognition restart failed:', error);
              }
            }
          }, 2000);
        }
      };
      
      recognitionRef.current.onend = () => {
        if (isListening && !useOmniDimension) {
          // Restart recognition immediately if still listening (but not for network errors)
          setTimeout(() => {
            try {
              if (recognitionRef.current && !recognitionRef.current.error) {
                recognitionRef.current.start();
              }
            } catch (error) {
              console.log('Speech recognition restart failed');
            }
          }, 100);
        }
      };
    }
  }, [isListening, useOmniDimension]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => v.name));
      
      // Find Aisha or best female voice (avoid Microsoft Zira)
      const aishaVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('aisha') ||
        voice.name.toLowerCase().includes('isha')
      );
      
      if (aishaVoice) {
        console.log('Found Aisha voice:', aishaVoice.name);
      } else {
        // Find any female voice (excluding Microsoft Zira)
        const femaleVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') ||
           voice.name.toLowerCase().includes('woman') ||
           voice.name.toLowerCase().includes('girl') ||
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('victoria') ||
           voice.name.toLowerCase().includes('google uk english female') ||
           voice.name.toLowerCase().includes('google') ||
           voice.name.toLowerCase().includes('natural')) &&
          !voice.name.toLowerCase().includes('zira') && // Avoid Microsoft Zira
          !voice.name.toLowerCase().includes('microsoft')
        );
        
        if (femaleVoice) {
          console.log('Found female voice:', femaleVoice.name);
        }
      }
    };

    // Load voices immediately if available
    loadVoices();
    
    // Also listen for voices to be loaded
    speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current && !audioContextClosedRef.current) {
        try {
          audioContextRef.current.close();
          audioContextClosedRef.current = true;
        } catch (error) {
          console.log('AudioContext already closed or closing');
        }
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // AI Speaking functionality
  const startAISpeaking = () => {
    setIsAISpeaking(true);
    
    // Create speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Hello, I'm Haven. I'm here to listen and support you. How are you feeling today?";
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Set voice to Aisha or best available female voice
      const voices = speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // First try to find Aisha specifically
      selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('aisha') ||
        voice.name.toLowerCase().includes('isha')
      );
      
      // If Aisha not found, find any female voice (avoid Microsoft Zira)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') ||
           voice.name.toLowerCase().includes('woman') ||
           voice.name.toLowerCase().includes('girl') ||
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('victoria') ||
           voice.name.toLowerCase().includes('google uk english female') ||
           voice.name.toLowerCase().includes('microsoft zira') ||
           (voice.name.toLowerCase().includes('google') && voice.name.toLowerCase().includes('female'))) &&
          !voice.name.toLowerCase().includes('zira') && // Avoid Microsoft Zira
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      // If still no female voice, use any natural-sounding voice (avoid Microsoft Zira)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.includes('Google') || 
           voice.name.includes('Natural') || 
           voice.name.includes('Premium') ||
           voice.name.includes('Enhanced')) &&
          !voice.name.toLowerCase().includes('zira') &&
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      // Last resort: any voice except Microsoft Zira
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          !voice.name.toLowerCase().includes('zira') &&
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Using voice:', selectedVoice.name);
      }
      
      utterance.onend = () => {
        setIsAISpeaking(false);
        toast.success("I'm ready to listen. Please start speaking.");
      };
      
      utterance.onerror = () => {
        setIsAISpeaking(false);
        toast.error("Sorry, I couldn't speak. Let's continue with text.");
      };
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback if speech synthesis is not available
      setIsAISpeaking(false);
      toast.success("Voice synthesis not available. Please use text chat or voice widget.");
    }
  };

  const speakAIResponse = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      setIsAISpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = text;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Set voice to Aisha or best available female voice
      const voices = speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // First try to find Aisha specifically
      selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('aisha') ||
        voice.name.toLowerCase().includes('isha')
      );
      
      // If Aisha not found, find any female voice (avoid Microsoft Zira)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') ||
           voice.name.toLowerCase().includes('woman') ||
           voice.name.toLowerCase().includes('girl') ||
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('victoria') ||
           voice.name.toLowerCase().includes('google uk english female') ||
           voice.name.toLowerCase().includes('microsoft zira') ||
           (voice.name.toLowerCase().includes('google') && voice.name.toLowerCase().includes('female'))) &&
          !voice.name.toLowerCase().includes('zira') && // Avoid Microsoft Zira
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      // If still no female voice, use any natural-sounding voice (avoid Microsoft Zira)
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.includes('Google') || 
           voice.name.includes('Natural') || 
           voice.name.includes('Premium') ||
           voice.name.includes('Enhanced')) &&
          !voice.name.toLowerCase().includes('zira') &&
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      // Last resort: any voice except Microsoft Zira
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          !voice.name.toLowerCase().includes('zira') &&
          !voice.name.toLowerCase().includes('microsoft')
        );
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log('Using voice for response:', selectedVoice.name);
      }
      
      utterance.onend = () => {
        setIsAISpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsAISpeaking(false);
        toast.error("Sorry, I couldn't speak my response.");
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAISpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsAISpeaking(false);
  };

  const startListening = async () => {
    if (!hasPermission) {
      toast.error('Please allow microphone access to use voice chat');
      return;
    }

    // Try to use OmniDimension widget first
    if (useOmniDimension && widgetLoaded) {
      console.log('Starting OmniDimension voice session...');
      const success = openOmniDimensionWidget();
      if (success) {
        setConnectionStatus('connected');
        toast.success('OmniDimension widget opened. You can now speak with Haven.');
        
        // Start AI speaking after widget opens
        setTimeout(() => {
          startAISpeaking();
        }, 1000);
        return;
      } else {
        toast.error('Failed to open OmniDimension widget. Please try again or switch to local voice.');
        return;
      }
    }

    // If OmniDimension widget is not available or failed, offer fallback
    if (useOmniDimension && !widgetLoaded) {
      const shouldUseLocal = window.confirm(
        'OmniDimension widget is not available. Would you like to switch to local voice processing instead?'
      );
      if (shouldUseLocal) {
        setUseOmniDimension(false);
        toast.success('Switched to local voice processing');
        // Continue with local voice processing
      } else {
        toast.error('Please wait for OmniDimension widget to load or refresh the page');
        return;
      }
    }

    // Fallback to local voice processing
    try {
      setConnectionStatus('connecting');
      toast.loading('Connecting to voice assistant...', { duration: 3000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      // Reset AudioContext state
      audioContextClosedRef.current = false;
      
      // Set up audio analysis for visual feedback
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (isListening && !audioContextClosedRef.current) {
          try {
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / bufferLength;
            setAudioLevel(average / 255);
            animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
          } catch (error) {
            console.log('Audio analysis stopped');
          }
        }
      };

      setIsListening(true);
      setConnectionStatus('listening');
      toast.dismiss();
      
      // Start AI speaking when local voice processing starts
      startAISpeaking();
      
      // Start speech recognition for local processing
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          toast.success('Voice recognition active. Start speaking!');
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
          toast.error('Speech recognition failed. Please try again.');
        }
      }
      
      updateAudioLevel();

    } catch (error) {
      console.error('Error starting voice chat:', error);
      setConnectionStatus('idle');
      toast.error('Failed to start voice chat. Please try again.');
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setConnectionStatus('idle');
    setAudioLevel(0);
    setSpeechError(null);
    
    // Stop AI speaking
    stopAISpeaking();
    
    // Close OmniDimension widget if open
    if (window.omnidimensionWidget) {
      try {
        window.omnidimensionWidget.close();
      } catch (error) {
        console.log('Failed to close widget');
      }
    }
    
    toast.success('Voice session ended');
  };

  const retrySpeechRecognition = () => {
    if (!useOmniDimension && recognitionRef.current) {
      try {
        setSpeechError(null);
        recognitionRef.current.start();
        toast.success('Retrying speech recognition...');
      } catch (error) {
        console.error('Failed to retry speech recognition:', error);
        toast.error('Failed to restart speech recognition');
      }
    }
  };

  const toggleVoiceMode = () => {
    setUseOmniDimension(!useOmniDimension);
    toast.success(`Switched to ${!useOmniDimension ? 'OmniDimension' : 'local'} voice processing`);
  };

  const openTextChat = () => {
    const success = openChatWidget();
    if (!success) {
      toast.error('Text chat not available. Please use voice options.');
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connecting': return 'text-yellow-400';
      case 'listening': return 'text-blue-400';
      case 'connected': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = () => {
    if (isAISpeaking) return 'AI Speaking...';
    
    switch (connectionStatus) {
      case 'connecting': return 'Connecting...';
      case 'listening': return 'Listening...';
      case 'connected': return 'Connected';
      default: return 'Ready to Connect';
    }
  };

  // AI Response Generator for local processing
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Crisis detection keywords
    const crisisKeywords = ['suicide', 'kill myself', 'want to die', 'end it all', 'no reason to live', 'better off dead'];
    const emergencyKeywords = ['emergency', 'urgent', 'immediate', 'right now', 'can\'t take it'];
    const anxietyKeywords = ['anxious', 'panic', 'worried', 'stress', 'overwhelmed', 'scared'];
    const depressionKeywords = ['sad', 'depressed', 'hopeless', 'worthless', 'tired', 'empty'];
    
    let response = '';
    
    // Crisis response (highest priority)
    if (crisisKeywords.some(keyword => input.includes(keyword))) {
      response = "I hear that you're in a lot of pain right now, and I want you to know that your life has value. You're not alone in this. Can you tell me more about what's bringing you to this point? I'm here to listen without judgment.";
    }
    // Emergency response
    else if (emergencyKeywords.some(keyword => input.includes(keyword))) {
      response = "I understand this feels urgent and overwhelming. Let's take a moment to breathe together. Can you tell me what's happening right now that feels so immediate? I'm here to help you through this.";
    }
    // Anxiety response
    else if (anxietyKeywords.some(keyword => input.includes(keyword))) {
      response = "Anxiety can feel so overwhelming, like it's taking over everything. Let's take a deep breath together. Can you tell me more about what's making you feel this way? Sometimes talking about it can help.";
    }
    // Depression response
    else if (depressionKeywords.some(keyword => input.includes(keyword))) {
      response = "I hear the heaviness in what you're saying. Depression can make everything feel so dark and hopeless. You don't have to carry this alone. Can you tell me more about how you've been feeling?";
    }
    // General supportive response
    else {
      const responses = [
        "Thank you for sharing that with me. I can hear that this is really affecting you. Can you tell me more about how you're feeling?",
        "I appreciate you opening up to me. It sounds like you're going through something really difficult. What's been the hardest part for you?",
        "I'm listening, and I want to understand what you're experiencing. Can you help me understand more about what's been happening?",
        "Thank you for trusting me with this. I can sense that this is really important to you. How long have you been feeling this way?",
        "I hear you, and I want you to know that your feelings are valid. Can you tell me more about what's been going on?"
      ];
      response = responses[Math.floor(Math.random() * responses.length)];
    }
    
    return response;
  };

  // Process user speech and generate AI response (for local processing)
  const processUserSpeech = async (speech) => {
    console.log('User said:', speech);
    
    // Add to conversation history
    const newEntry = {
      type: 'user',
      text: speech,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newEntry]);
    
    // Generate AI response
    const aiResponseText = generateAIResponse(speech);
    setAiResponse(aiResponseText);
    
    // Add AI response to conversation history
    const aiEntry = {
      type: 'ai',
      text: aiResponseText,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, aiEntry]);
    
    // Speak the AI response
    speakAIResponse(aiResponseText);
  };

  return (
    <div className="space-y-4">
      {/* Voice Options Selection */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Choose Your Voice Support Option</h3>
        
        {/* OmniDimension Option */}
        <div className="mb-4">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium">OmniDimension AI</h4>
                <p className="text-sm text-gray-300">Advanced AI-powered voice support</p>
              </div>
            </div>
            <button
              onClick={() => setUseOmniDimension(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                useOmniDimension 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {widgetLoaded ? 'Use OmniDimension' : 'Loading...'}
            </button>
          </div>
          {useOmniDimension && (
            <div className="mt-2 text-xs">
              {widgetLoaded ? (
                <p className="text-green-400">✓ OmniDimension widget ready</p>
              ) : (
                <p className="text-yellow-400">⏳ Loading OmniDimension widget...</p>
              )}
            </div>
          )}
        </div>

        {/* Local Voice Option */}
        <div>
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-medium">Local Voice Chat</h4>
                <p className="text-sm text-gray-300">Browser-based speech recognition</p>
              </div>
            </div>
            <button
              onClick={() => setUseOmniDimension(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !useOmniDimension 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              Use Local Voice
            </button>
          </div>
          {!useOmniDimension && (
            <div className="mt-2 text-xs">
              <p className="text-green-400">✓ Local voice processing available</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Voice Button */}
      <motion.button
        onClick={isListening ? stopListening : startListening}
        className={`relative w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 shadow-lg shadow-red-500/30 animate-pulse' 
            : 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/30'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!hasPermission}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
        
        {/* Audio Level Indicator */}
        {isListening && audioLevel > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            style={{
              transform: `scale(${1 + audioLevel * 0.5})`,
              opacity: audioLevel * 0.8
            }}
          />
        )}
      </motion.button>

      {/* Status Display */}
      <div className="text-center">
        <p className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </p>
        {!hasPermission && (
          <p className="text-xs text-red-400 mt-1">
            Microphone access required
          </p>
        )}
        {isAISpeaking && (
          <p className="text-xs text-blue-400 mt-1">
            Haven is speaking...
          </p>
        )}
        {speechError && !useOmniDimension && (
          <div className="mt-2 space-y-2">
            <p className="text-xs text-red-400">
              Speech recognition error: {speechError}
            </p>
            <button
              onClick={retrySpeechRecognition}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-xs transition-colors"
            >
              Retry Speech Recognition
            </button>
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {useOmniDimension ? 'Using OmniDimension AI' : 'Using local voice processing'}
        </p>
      </div>

      {/* Conversation Display */}
      {conversationHistory.length > 0 && (
        <div className="max-h-60 overflow-y-auto bg-gray-800 rounded-lg p-3 space-y-2">
          <p className="text-xs text-gray-400 font-medium mb-3">Conversation with Haven:</p>
          {conversationHistory.slice(-6).map((entry, index) => (
            <ChatMessage 
              key={index}
              message={entry.text}
              sender={entry.type}
            />
          ))}
        </div>
      )}

      {/* Alternative Options */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={openTextChat}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">Text Chat</span>
        </button>
        
        <button
          onClick={() => openOmniDimensionWidget()}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Open Widget</span>
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;