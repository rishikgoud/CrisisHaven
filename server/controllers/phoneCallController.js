import axios from 'axios';
import Session from '../models/Session.js';
import { v4 as uuidv4 } from 'uuid';

// Mock response generator for phone calls
const generateMockPhoneCallResponse = (sessionId, phoneNumber) => {
  return {
    session_id: `mock_${sessionId}`,
    status: 'initiated',
    counselor_id: 'mock_counselor_001',
    counselor_name: 'Available Counselor',
    estimated_wait: '2-3 minutes',
    message: 'Phone call initiated successfully (mock)'
  };
};

// Initialize phone call
const initiatePhoneCall = async (req, res) => {
  try {
    const { userId, phoneNumber, userInfo } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is required'
      });
    }

    // Create session ID
    const sessionId = uuidv4();

    // Create session record
    const session = await Session.create({
      sessionId,
      userId: userId || null,
      type: 'phone_call',
      status: 'initiated',
      userInfo: {
        name: userInfo?.name || 'Anonymous',
        phone: phoneNumber,
        email: userInfo?.email || '',
        isAnonymous: !userId
      },
      metadata: {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        deviceType: req.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop'
      }
    });

    // Since OmniDimension API is not reachable, always use mock response
    console.log('OmniDimension API not reachable, using mock phone call response');
    
    // Generate mock response
    const mockResponse = generateMockPhoneCallResponse(sessionId, phoneNumber);
    
    // Update session with mock data
    session.status = 'connecting';
    session.counselor = {
      id: mockResponse.counselor_id,
      name: mockResponse.counselor_name
    };
    session.notes = 'Using mock response - OmniDimension API not reachable';
    await session.save();

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('phone-call-initiated', {
        sessionId,
        phoneNumber,
        status: 'connecting',
        estimatedWait: mockResponse.estimated_wait
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        status: 'initiated',
        phoneNumber,
        estimatedWait: mockResponse.estimated_wait,
        message: mockResponse.message,
        mock: true
      }
    });

  } catch (error) {
    console.error('Phone call initiation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate phone call',
      message: error.message
    });
  }
};

// Update phone call status
const updatePhoneCallStatus = async (req, res) => {
  try {
    const { sessionId, status, counselorInfo, notes } = req.body;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Update session
    session.status = status;
    if (counselorInfo) {
      session.counselor = counselorInfo;
    }
    if (notes) {
      session.notes = notes;
    }

    // If session is ending, calculate duration
    if (status === 'ended') {
      await session.endSession();
    }

    await session.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(sessionId).emit('phone-call-status-updated', {
        sessionId,
        status,
        counselorInfo,
        duration: session.duration
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        status,
        duration: session.duration
      }
    });

  } catch (error) {
    console.error('Phone call status update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update phone call status',
      message: error.message
    });
  }
};

// Get phone call session details
const getPhoneCallSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    res.status(200).json({
      success: true,
      data: session
    });

  } catch (error) {
    console.error('Get phone call session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session details',
      message: error.message
    });
  }
};

// End phone call session
const endPhoneCallSession = async (req, res) => {
  try {
    const { sessionId, outcome, notes } = req.body;

    const session = await Session.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // End session
    await session.endSession();
    
    // Update outcome and notes
    if (outcome) {
      session.outcome = outcome;
    }
    if (notes) {
      session.notes = notes;
    }
    
    await session.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(sessionId).emit('phone-call-ended', {
        sessionId,
        duration: session.duration,
        outcome: session.outcome
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId,
        status: 'ended',
        duration: session.duration,
        outcome: session.outcome
      }
    });

  } catch (error) {
    console.error('End phone call session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to end session',
      message: error.message
    });
  }
};

// Get emergency contacts
const getEmergencyContacts = async (req, res) => {
  try {
    const emergencyContacts = {
      national_crisis_line: {
        number: '1-800-273-8255',
        name: 'National Suicide Prevention Lifeline',
        available: '24/7'
      },
      crisis_text_line: {
        number: '741741',
        name: 'Crisis Text Line',
        available: '24/7'
      },
      emergency: {
        number: '911',
        name: 'Emergency Services',
        available: '24/7'
      },
      veterans_crisis_line: {
        number: '1-800-273-8255',
        name: 'Veterans Crisis Line',
        available: '24/7'
      },
      trevor_project: {
        number: '1-866-488-7386',
        name: 'The Trevor Project (LGBTQ+)',
        available: '24/7'
      }
    };

    res.status(200).json({
      success: true,
      data: emergencyContacts
    });

  } catch (error) {
    console.error('Get emergency contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get emergency contacts',
      message: error.message
    });
  }
};

export {
  initiatePhoneCall,
  updatePhoneCallStatus,
  getPhoneCallSession,
  endPhoneCallSession,
  getEmergencyContacts
}; 