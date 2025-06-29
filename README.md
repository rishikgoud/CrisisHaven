# CrisisHaven - AI-Powered Mental Health Crisis Support Platform

![CrisisHaven Logo](https://img.shields.io/badge/CrisisHaven-AI%20Powered%20Support-blue?style=for-the-badge&logo=heart)
![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green?style=flat&logo=mongodb)

## 🌟 Overview

CrisisHaven is a comprehensive mental health crisis support platform that provides immediate AI-powered assistance, human counselor connections, and community support. Built with modern web technologies, it offers 24/7 anonymous support for individuals in crisis.

## ✨ Features

### 🤖 AI-Powered Support
- **Instant AI Companion**: Connect with Haven, our AI assistant for immediate triage
- **Sentiment Analysis**: Real-time emotion detection using HuggingFace AI
- **Intelligent Responses**: Context-aware support based on user emotions

### 👥 Human Connection
- **Peer Support Chat**: Anonymous peer-to-peer support with real-time messaging
- **Professional Counselors**: Seamless transition to licensed mental health professionals
- **Community Support**: Join supportive communities of people who understand

### 📊 Mental Health Tracking
- **Digital Journal**: AI-powered journaling with emotion analysis
- **Mood Dashboard**: Visual mood trends and insights
- **Progress Tracking**: Monitor your mental health journey

### 🚨 Crisis Support
- **Emergency Button**: One-click access to immediate crisis support
- **Voice Chat**: Real-time voice conversations with AI and humans
- **Safety Features**: Built-in safety checks and emergency protocols

### 🔒 Privacy & Security
- **Anonymous Support**: Complete privacy protection
- **JWT Authentication**: Secure user authentication
- **Data Encryption**: All data is encrypted and secure

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

### AI & External APIs
- **HuggingFace** - Sentiment analysis and emotion detection
- **OmniDimension** - Voice chat and communication
- **Web Speech API** - Browser-based speech recognition

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- HuggingFace API key
- OmniDimension API credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/crisishaven.git
cd crisishaven
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd CrisisHaven
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Environment Setup**

Create `.env` files in both directories:

**Frontend (.env in CrisisHaven/)**
```env
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_SOCKET_URL=http://localhost:4000
```

**Backend (.env in server/)**
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crisishaven
JWT_SECRET=your_super_secret_jwt_key_here
HF_API_KEY=your_huggingface_api_key_here
OMNIDIM_API_KEY=your_omnidim_api_key_here
OMNIDIM_AGENT_ID=your_agent_id_here
FRONTEND_URL=http://localhost:3000
```

4. **Start the development servers**
```bash
# Start backend (from server directory)
cd server
npm start

# Start frontend (from CrisisHaven directory)
cd CrisisHaven
npm start
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- Health Check: http://localhost:4000/health

## 📁 Project Structure

```
crisishaven/
├── CrisisHaven/                 # Frontend React application
│   ├── public/                  # Static files
│   │   ├── components/          # React components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── chat/           # Chat components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── journal/        # Journal components
│   │   │   ├── layout/         # Layout components
│   │   │   ├── peer-chat/      # Peer chat components
│   │   │   ├── support/        # Support components
│   │   │   └── ui/             # UI components
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   └── utils/              # Utility functions
│   └── package.json
├── server/                      # Backend Node.js application
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Express middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── config/                 # Configuration files
│   └── index.js                # Server entry point
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Frontend (CrisisHaven/.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `http://localhost:4000` |
| `REACT_APP_SOCKET_URL` | WebSocket URL | `http://localhost:4000` |

#### Backend (server/.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `HF_API_KEY` | HuggingFace API key | Yes |
| `OMNIDIM_API_KEY` | OmniDimension API key | Yes |
| `OMNIDIM_AGENT_ID` | OmniDimension agent ID | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

## 🚀 Deployment

### Deploy to Render

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service**
3. **Configure environment variables**
4. **Set build commands:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Deploy to Vercel

1. **Connect your GitHub repository to Vercel**
2. **Configure build settings**
3. **Set environment variables**
4. **Deploy**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you're in crisis or need immediate help:
- **Emergency Services**: 911 (US) or your local emergency number
- **Crisis Hotlines**: 
  - National Suicide Prevention Lifeline: 988 (US)
  - Crisis Text Line: Text HOME to 741741 (US)
  - Your local crisis hotline

## 🙏 Acknowledgments

- HuggingFace for AI models
- OmniDimension for voice communication
- React and Node.js communities
- Mental health professionals and advocates

## 📊 Project Status

- ✅ Core functionality implemented
- ✅ AI integration complete
- ✅ Real-time chat working
- ✅ Authentication system ready
- ✅ Dashboard and analytics
- 🚧 Deployment configuration
- 🚧 Production optimization

---

**Built with ❤️ for mental health support and crisis intervention** 