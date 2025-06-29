import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false // Can be anonymous
  },
  type: {
    type: String,
    enum: ['web_call', 'phone_call', 'chat', 'voice'],
    required: true
  },
  status: {
    type: String,
    enum: ['initiated', 'connecting', 'active', 'ended', 'failed'],
    default: 'initiated'
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  counselor: {
    id: String,
    name: String,
    specialization: String
  },
  userInfo: {
    name: String,
    phone: String,
    email: String,
    isAnonymous: { type: Boolean, default: true }
  },
  crisisLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  outcome: {
    type: String,
    enum: ['resolved', 'referred', 'escalated', 'incomplete'],
    default: 'incomplete'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  followUp: {
    required: { type: Boolean, default: false },
    scheduledDate: Date,
    completed: { type: Boolean, default: false }
  },
  metadata: {
    userAgent: String,
    ipAddress: String,
    location: {
      country: String,
      region: String,
      city: String
    },
    deviceType: String
  },
  tags: [String], // For categorization and analytics
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate duration when session ends
SessionSchema.methods.endSession = function() {
  this.endTime = new Date();
  this.duration = Math.floor((this.endTime - this.startTime) / 1000);
  this.status = 'ended';
  return this.save();
};

// Get session statistics
SessionSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
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
  
  return stats[0] || {
    totalSessions: 0,
    activeSessions: 0,
    avgDuration: 0,
    totalDuration: 0
  };
};

// Get sessions by date range
SessionSchema.statics.getSessionsByDateRange = async function(startDate, endDate) {
  return await this.find({
    startTime: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ startTime: -1 });
};

const Session = mongoose.model('Session', SessionSchema);
export default Session; 