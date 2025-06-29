import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIo } from 'socket.io';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import authRoutes from './routes/auth.js';
import webCallRoutes from './routes/webCall.js';
import phoneCallRoutes from './routes/phoneCall.js';
import sessionRoutes from './routes/sessions.js';
import userRoutes from './routes/users.js';
import sentimentRoutes from './routes/sentiment.js';
import {errorHandler} from './middleware/errorHandler.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Setup check endpoint
app.get('/setup', (req, res) => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'OMNIDIM_API_KEY',
    'OMNIDIM_AGENT_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  res.json({
    status: missingVars.length === 0 ? 'ready' : 'incomplete',
    missing_variables: missingVars,
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000
  });
});

// API Routes
app.use('/api/web-call', webCallRoutes);
app.use('/api/phone-call', phoneCallRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/sentiment', sentimentRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  // Join admin room for real-time updates
  socket.on('join-admin', () => {
    socket.join('admin');
    console.log('👨‍💼 Admin joined room');
  });

  // Join session room for specific call updates
  socket.on('join-session', (sessionId) => {
    socket.join(`session-${sessionId}`);
    console.log(`📞 Client joined session: ${sessionId}`);
  });

  // Handle call status updates
  socket.on('call-status-update', (data) => {
    const { sessionId, status, message } = data;
    io.to(`session-${sessionId}`).emit('status-updated', { sessionId, status, message });
    io.to('admin').emit('call-log-updated', { sessionId, status, message });
    console.log(`📊 Call status update: ${sessionId} - ${status}`);
  });

  // Handle emergency alerts
  socket.on('emergency-alert', (data) => {
    io.to('admin').emit('emergency-alert', data);
    console.log('🚨 Emergency alert sent to admin');
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Make io available to routes
app.set('io', io);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crisishaven');
    console.log('✅ MongoDB Connected:', conn.connection.host);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('1. Check if MongoDB is running');
    console.log('2. Verify your MONGODB_URI in .env file');
    console.log('3. For MongoDB Atlas, ensure your IP is whitelisted');
    console.log('4. For local MongoDB, ensure mongod service is running');
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 CrisisHaven Backend Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔧 Setup check: http://localhost:${PORT}/setup`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

startServer();

export { app, server, io }; 