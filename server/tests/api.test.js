const request = require('supertest');
const { app } = require('../index');
const mongoose = require('mongoose');

describe('CrisisHaven API Tests', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/crisishaven_test');
  });

  afterAll(async () => {
    // Clean up and disconnect
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('OK');
      expect(response.body.message).toBe('CrisisHaven API is running');
    });
  });

  describe('Web Call API', () => {
    it('should initiate web call session', async () => {
      const response = await request(app)
        .post('/api/web-call')
        .send({
          userInfo: {
            name: 'Test User',
            email: 'test@example.com'
          }
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.sessionId).toBeDefined();
      expect(response.body.data.status).toBeDefined();
    });
  });

  describe('Phone Call API', () => {
    it('should initiate phone call', async () => {
      const response = await request(app)
        .post('/api/phone-call')
        .send({
          phoneNumber: '+1234567890',
          userInfo: {
            name: 'Test User'
          }
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.sessionId).toBeDefined();
      expect(response.body.data.status).toBeDefined();
    });

    it('should return error for missing phone number', async () => {
      const response = await request(app)
        .post('/api/phone-call')
        .send({
          userInfo: {
            name: 'Test User'
          }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Phone number is required');
    });
  });

  describe('Emergency Contacts API', () => {
    it('should return emergency contacts', async () => {
      const response = await request(app)
        .get('/api/phone-call/emergency-contacts')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.national_crisis_line).toBeDefined();
      expect(response.body.data.emergency).toBeDefined();
    });
  });

  describe('Authentication API', () => {
    it('should register new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.data.name).toBe(userData.name);
      expect(response.body.data.email).toBe(userData.email);
    });

    it('should login user', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(credentials)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('Protected Routes', () => {
    let authToken;

    beforeAll(async () => {
      // Login to get token
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      authToken = response.body.token;
    });

    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    it('should reject access without token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
}); 