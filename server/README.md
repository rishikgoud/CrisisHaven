# CrisisHaven Backend API

A comprehensive backend API for the CrisisHaven mental health support platform, built with Express.js, MongoDB, and Socket.IO for real-time communication.

## 🚀 Features

- **Web Call Management**: Handle web-based crisis support sessions
- **Phone Call Integration**: Manage phone call sessions with OmniDimension API
- **Session Tracking**: Comprehensive session management and analytics
- **User Authentication**: JWT-based authentication with user profiles
- **Real-time Updates**: Socket.IO integration for live session updates
- **Emergency Contacts**: Built-in emergency contact management
- **Rate Limiting**: API rate limiting for security
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- OmniDimension API credentials

## 🛠️ Installation

1. **Clone the repository and navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/crisishaven
   JWT_SECRET=your_super_secret_jwt_key_here
   OMNIDIM_API_KEY=your_omnidim_api_key_here
   OMNIDIM_AGENT_ID=your_agent_id_here
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── webCallController.js # Web call management
│   └── phoneCallController.js # Phone call management
├── middleware/
│   ├── auth.js              # Authentication middleware
│   └── errorHandler.js      # Error handling middleware
├── models/
│   ├── User.js              # User model with authentication
│   └── Session.js           # Session tracking model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── phoneCall.js         # Phone call routes
│   ├── sessions.js          # Session management routes
│   ├── users.js             # User management routes
│   └── webCall.js           # Web call routes
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Web Calls
- `POST /api/web-call` - Initiate web call session
- `PUT /api/web-call/status` - Update web call status
- `GET /api/web-call/:sessionId` - Get web call session details
- `POST /api/web-call/end` - End web call session

### Phone Calls
- `POST /api/phone-call` - Initiate phone call
- `PUT /api/phone-call/status` - Update phone call status
- `GET /api/phone-call/:sessionId` - Get phone call session details
- `POST /api/phone-call/end` - End phone call session
- `GET /api/phone-call/emergency-contacts` - Get emergency contacts

### Sessions
- `GET /api/sessions` - Get all sessions (with filtering)
- `GET /api/sessions/stats` - Get session statistics
- `GET /api/sessions/:id` - Get single session details

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/crisis-history` - Get user's crisis history

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📊 Database Models

### User Model
- Email, password, name, phone
- User preferences and settings
- Crisis history tracking
- Emergency contact information

### Session Model
- Session tracking with unique IDs
- Call type (web, phone, chat, voice)
- Status tracking (initiated, connecting, active, ended, failed)
- Duration calculation
- Counselor information
- Outcome tracking

## 🔄 Real-time Features

Socket.IO is integrated for real-time updates:
- Web call status updates
- Phone call status updates
- Session progress notifications
- Live connection status

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **Rate Limiting**: API rate limiting
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator for request validation
- **Password Hashing**: bcryptjs for secure password storage
- **JWT**: Secure token-based authentication

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 🚀 Deployment

1. **Production environment variables:**
   ```env
   NODE_ENV=production
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_production_jwt_secret
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `OMNIDIM_API_KEY` | OmniDimension API key | - |
| `OMNIDIM_AGENT_ID` | OmniDimension agent ID | - |
| `OMNIDIM_BASE_URL` | OmniDimension API base URL | https://api.omnidim.io |
| `CORS_ORIGIN` | CORS allowed origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `BCRYPT_ROUNDS` | Password hashing rounds | 12 |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the CrisisHaven development team. 