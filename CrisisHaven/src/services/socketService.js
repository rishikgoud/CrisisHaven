import { io } from 'socket.io-client';
import toast from 'react-hot-toast';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.listeners = new Map();
  }

  // Initialize socket connection
  connect() {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://crisishaven.onrender.com';
    
    this.socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      reconnectionDelayMax: 5000,
      maxReconnectionAttempts: this.maxReconnectAttempts,
      autoConnect: true
    });

    this.setupEventListeners();
    return this.socket;
  }

  // Setup socket event listeners
  setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('🔌 Socket connected:', this.socket.id);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Emit connection event to listeners
      this.emitToListeners('connection', { connected: true, socketId: this.socket.id });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 Socket disconnected:', reason);
      this.isConnected = false;
      
      // Emit disconnection event to listeners
      this.emitToListeners('disconnection', { connected: false, reason });
      
      if (reason === 'io server disconnect') {
        // Server disconnected us, try to reconnect
        this.socket.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🔌 Max reconnection attempts reached');
        toast.error('Connection to server failed. Please refresh the page.');
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔌 Socket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      // Emit reconnection event to listeners
      this.emitToListeners('reconnection', { connected: true, attemptNumber });
    });

    // Call status updates
    this.socket.on('status-updated', (data) => {
      console.log('📊 Status updated:', data);
      this.emitToListeners('status-updated', data);
    });

    // Call log updates (for admin)
    this.socket.on('call-log-updated', (data) => {
      console.log('📋 Call log updated:', data);
      this.emitToListeners('call-log-updated', data);
    });

    // Emergency alerts
    this.socket.on('emergency-alert', (data) => {
      console.log('🚨 Emergency alert:', data);
      this.emitToListeners('emergency-alert', data);
      
      // Show emergency notification
      toast.error('🚨 Emergency call detected!', {
        duration: 10000,
        icon: '🚨'
      });
    });
  }

  // Join admin room for real-time updates
  joinAdmin() {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-admin');
      console.log('👨‍💼 Joined admin room');
    }
  }

  // Join specific session room
  joinSession(sessionId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-session', sessionId);
      console.log(`📞 Joined session: ${sessionId}`);
    }
  }

  // Leave session room
  leaveSession(sessionId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave-session', sessionId);
      console.log(`📞 Left session: ${sessionId}`);
    }
  }

  // Update call status
  updateCallStatus(sessionId, status, message = '') {
    if (this.socket && this.isConnected) {
      this.socket.emit('call-status-update', {
        sessionId,
        status,
        message
      });
      console.log(`📊 Emitted status update: ${sessionId} - ${status}`);
    }
  }

  // Send emergency alert
  sendEmergencyAlert(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('emergency-alert', data);
      console.log('🚨 Emergency alert sent');
    }
  }

  // Add event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Emit to all listeners for an event
  emitToListeners(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} listener:`, error);
        }
      });
    }
  }

  // Get connection status
  getConnectionStatus() {
    return {
      connected: this.isConnected,
      socketId: this.socket?.id,
      reconnectAttempts: this.reconnectAttempts
    };
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
      console.log('🔌 Socket disconnected');
    }
  }

  // Reconnect socket
  reconnect() {
    if (this.socket) {
      this.socket.connect();
    } else {
      this.connect();
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService; 