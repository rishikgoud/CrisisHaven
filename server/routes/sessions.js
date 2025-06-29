import express from 'express';
const router = express.Router();
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import Session from '../models/Session.js';

// @route   GET /api/sessions
// @desc    Get all sessions (with optional filtering)
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { type, status, limit = 50, page = 1 } = req.query;
    
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const sessions = await Session.find(filter)
      .sort({ startTime: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('userId', 'name email');

    const total = await Session.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: sessions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get sessions',
      message: error.message
    });
  }
});

// @route   GET /api/sessions/stats
// @desc    Get session statistics
// @access  Private
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const stats = await Session.aggregate([
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          activeSessions: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          avgDuration: { $avg: '$duration' },
          totalDuration: { $sum: '$duration' }
        }
      }
    ]);

    const sessionsByType = await Session.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgDuration: { $avg: '$duration' }
        }
      }
    ]);

    const result = {
      ...stats[0],
      sessionsByType
    };

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get session stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session statistics',
      message: error.message
    });
  }
});

// @route   GET /api/sessions/:id
// @desc    Get single session by ID
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('userId', 'name email');

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
    console.error('Get session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get session',
      message: error.message
    });
  }
});

// @route   PUT /api/sessions/:id
// @desc    Update session
// @access  Private
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { status, outcome, notes, followUp } = req.body;

    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Update fields
    if (status) session.status = status;
    if (outcome) session.outcome = outcome;
    if (notes) session.notes = notes;
    if (followUp) session.followUp = followUp;

    // If ending session, calculate duration
    if (status === 'ended') {
      await session.endSession();
    }

    await session.save();

    res.status(200).json({
      success: true,
      data: session
    });

  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update session',
      message: error.message
    });
  }
});

// @route   DELETE /api/sessions/:id
// @desc    Delete session
// @access  Private
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    await session.remove();

    res.status(200).json({
      success: true,
      data: {}
    });

  } catch (error) {
    console.error('Delete session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete session',
      message: error.message
    });
  }
});

export default router; 