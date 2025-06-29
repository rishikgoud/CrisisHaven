import express from 'express';
import {
  initiateWebCall,
  getSessionStatus,
  updateSessionStatus,
  endSession,
  getAllSessions
} from '../controllers/webCallController.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  validateSessionStatus,
  validateEndSession
} from '../middleware/validation.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/', initiateWebCall);
router.get('/:sessionId', getSessionStatus);

// Protected routes (authentication required)
router.put('/status', authenticateToken, validateSessionStatus, updateSessionStatus);
router.post('/end', authenticateToken, validateEndSession, endSession);

// Admin routes
router.get('/admin/sessions', authenticateToken, getAllSessions);

export default router; 