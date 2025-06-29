import axios from 'axios';
import Session from '../models/Session.js';
import { validateSessionData } from '../middleware/validation.js';
import { v4 as uuidv4 } from 'uuid';

// OmniDimension API configuration
const OMNIDIM_CONFIG = {
  API_KEY: process.env.OMNIDIM_API_KEY,
  AGENT_ID: process.env.OMNIDIM_AGENT_ID || 2465,
  BASE_URL: 'https://api.omnidim.io'
};

// Mock response generator
const generateMockWebCallResponse = (sessionId, userInfo) => {
  return {
    session_id: `mock_${sessionId}`,
    web_call_url: null, // No URL since we're using fallback
    counselor_name: 'Available Counselor',
    status: 'fallback',
    message: 'Using fallback chat widget. Please use the chat widget in the bottom right corner.'
  };
};

// Initialize web call session
const initiateWebCall = async (req, res) => {
  try {
    const { userInfo = {} } = req.body;
    
    // Validate user info
    const validation = validateSessionData({ userInfo });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user information',
        details: validation.errors
      });
    }

    // Create session record with required fields
    const sessionId = uuidv4();
    const session = new Session({
      sessionId: sessionId,
      type: 'web_call',
      status: 'initiated',
      userInfo: {
        name: userInfo.name || 'Anonymous User',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        isAnonymous: !userInfo.name
      },
      startTime: new Date(),
      emergency: userInfo.emergency || false
    });

    await session.save();

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('call-log-updated', {
        sessionId: session._id,
        status: 'initiating',
        message: 'Web call session initiated'
      });
    }

    // Since OmniDimension API is not reachable, always use mock response
    console.log('OmniDimension API not reachable, using mock response');
    
    // Generate mock response
    const mockResponse = generateMockWebCallResponse(session._id, userInfo);
    
    // Update session with mock data
    session.status = 'active';
    session.omnidimSessionId = mockResponse.session_id;
    session.webCallUrl = mockResponse.web_call_url;
    session.counselor = {
      id: 'mock_counselor_001',
      name: mockResponse.counselor_name
    };
    session.notes = 'Using mock response - OmniDimension API not reachable';
    await session.save();

    // Emit success update
    if (io) {
      io.to(`session-${session._id}`).emit('status-updated', {
        sessionId: session._id,
        status: 'active',
        message: 'Web call connected successfully (mock)'
      });
      io.to('admin').emit('call-log-updated', {
        sessionId: session._id,
        status: 'active',
        message: 'Web call session active (mock)'
      });
    }

    return res.json({
      success: true,
      data: {
        sessionId: session._id,
        webCallUrl: session.webCallUrl,
        status: session.status,
        message: mockResponse.message,
        fallback: true,
        mock: true
      }
    });

  } catch (error) {
    console.error('Web call initiation error:', error);
    
    // Emit error update
    const io = req.app.get('io');
    if (io) {
      io.to('admin').emit('call-log-updated', {
        status: 'error',
        message: 'Web call initiation failed'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to initiate web call',
      message: error.message
    });
  }
};

// Get session status
const getSessionStatus = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Calculate duration if session is active
    let duration = 0;
    if (session.status === 'active' && session.startTime) {
      duration = Math.floor((new Date() - session.startTime) / 1000);
    } else if (session.endTime && session.startTime) {
      duration = Math.floor((session.endTime - session.startTime) / 1000);
    }

    return res.json({
      success: true,
      data: {
        session_id: session._id,
        status: session.status,
        duration: duration,
        counselor_name: session.counselor || 'Unassigned',
        start_time: session.startTime,
        end_time: session.endTime,
        emergency: session.emergency
      }
    });

  } catch (error) {
    console.error('Get session status error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get session status',
      message: error.message
    });
  }
};

// Update session status
const updateSessionStatus = async (req, res) => {
  try {
    const { sessionId, status, notes } = req.body;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Update session
    session.status = status;
    if (notes) session.notes = notes;
    if (status === 'ended' && !session.endTime) {
      session.endTime = new Date();
    }
    
    await session.save();

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`session-${sessionId}`).emit('status-updated', {
        sessionId: sessionId,
        status: status,
        message: notes || `Session status updated to ${status}`
      });
      io.to('admin').emit('call-log-updated', {
        sessionId: sessionId,
        status: status,
        message: `Session ${status}`
      });
    }

    return res.json({
      success: true,
      data: {
        sessionId: session._id,
        status: session.status,
        message: 'Session status updated successfully'
      }
    });

  } catch (error) {
    console.error('Update session status error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update session status',
      message: error.message
    });
  }
};

// End session
const endSession = async (req, res) => {
  try {
    const { sessionId, outcome, notes } = req.body;
    
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Update session
    session.status = 'ended';
    session.outcome = outcome || 'completed';
    session.endTime = new Date();
    if (notes) session.notes = notes;
    
    await session.save();

    // Emit real-time update
    const io = req.app.get('io');
    if (io) {
      io.to(`session-${sessionId}`).emit('status-updated', {
        sessionId: sessionId,
        status: 'ended',
        message: 'Session ended'
      });
      io.to('admin').emit('call-log-updated', {
        sessionId: sessionId,
        status: 'ended',
        message: `Session ended with outcome: ${outcome}`
      });
    }

    return res.json({
      success: true,
      data: {
        sessionId: session._id,
        status: session.status,
        outcome: session.outcome,
        message: 'Session ended successfully'
      }
    });

  } catch (error) {
    console.error('End session error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to end session',
      message: error.message
    });
  }
};

// Get all sessions (for admin)
const getAllSessions = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type, emergency } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (emergency !== undefined) filter.emergency = emergency === 'true';

    const sessions = await Session.find(filter)
      .sort({ startTime: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Session.countDocuments(filter);

    return res.json({
      success: true,
      data: {
        sessions,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
      }
    });

  } catch (error) {
    console.error('Get all sessions error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to get sessions',
      message: error.message
    });
  }
};

export {
  initiateWebCall,
  getSessionStatus,
  updateSessionStatus,
  endSession,
  getAllSessions
}; 