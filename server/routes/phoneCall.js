import express from 'express';
const router = express.Router();
import { optionalAuth } from '../middleware/auth.js';
import {
  initiatePhoneCall,
  updatePhoneCallStatus,
  getPhoneCallSession,
  endPhoneCallSession,
  getEmergencyContacts
} from '../controllers/phoneCallController.js';

// @route   POST /api/phone-call
// @desc    Initiate a phone call
// @access  Public (with optional auth)
router.post('/', optionalAuth, initiatePhoneCall);

// @route   PUT /api/phone-call/status
// @desc    Update phone call status
// @access  Public
router.put('/status', updatePhoneCallStatus);

// @route   GET /api/phone-call/emergency-contacts
// @desc    Get emergency contact information
// @access  Public
router.get('/emergency-contacts', getEmergencyContacts);

// @route   POST /api/phone-call/end
// @desc    End phone call session
// @access  Public
router.post('/end', endPhoneCallSession);

// @route   GET /api/phone-call/:sessionId
// @desc    Get phone call session details
// @access  Public
router.get('/:sessionId', getPhoneCallSession);

export default router; 