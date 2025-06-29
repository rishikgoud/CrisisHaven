import { body, validationResult } from 'express-validator';

// Validation for session data
const validateSessionData = (data) => {
  const errors = [];
  
  // Validate userInfo if provided
  if (data.userInfo) {
    const { name, email, phone } = data.userInfo;
    
    if (name && typeof name !== 'string') {
      errors.push('Name must be a string');
    }
    
    if (email && typeof email !== 'string') {
      errors.push('Email must be a string');
    } else if (email && !isValidEmail(email)) {
      errors.push('Invalid email format');
    }
    
    if (phone && typeof phone !== 'string') {
      errors.push('Phone must be a string');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Express validation middleware for web call
const validateWebCall = [
  body('userInfo.name').optional().isString().trim().isLength({ max: 100 }),
  body('userInfo.email').optional().isEmail().normalizeEmail(),
  body('userInfo.phone').optional().isString().trim().isLength({ max: 20 }),
  body('userInfo.emergency').optional().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Express validation middleware for phone call
const validatePhoneCall = [
  body('phoneNumber').isString().trim().notEmpty().withMessage('Phone number is required'),
  body('userInfo.name').optional().isString().trim().isLength({ max: 100 }),
  body('userInfo.email').optional().isEmail().normalizeEmail(),
  body('userInfo.phone').optional().isString().trim().isLength({ max: 20 }),
  body('userInfo.emergency').optional().isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Express validation middleware for session status update
const validateSessionStatus = [
  body('sessionId').isMongoId().withMessage('Valid session ID is required'),
  body('status').isIn(['active', 'connecting', 'connected', 'failed', 'ended']).withMessage('Invalid status'),
  body('notes').optional().isString().trim().isLength({ max: 500 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

// Express validation middleware for ending session
const validateEndSession = [
  body('sessionId').isMongoId().withMessage('Valid session ID is required'),
  body('outcome').optional().isIn(['positive', 'negative', 'neutral', 'completed', 'failed']).withMessage('Invalid outcome'),
  body('notes').optional().isString().trim().isLength({ max: 500 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];

export {
  validateSessionData,
  validateWebCall,
  validatePhoneCall,
  validateSessionStatus,
  validateEndSession
}; 