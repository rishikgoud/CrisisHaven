# 🚀 CrisisHaven Deployment Guide

## GitHub Repository Setup ✅
- Repository: https://github.com/rishikgoud/CrisisHaven
- Status: Code pushed successfully

## Render Deployment (Recommended)

### Prerequisites
1. MongoDB Atlas account (free tier)
2. HuggingFace API key
3. OmniDimension API credentials

### Step 1: MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)

### Step 2: Render Deployment
1. Go to [Render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Blueprint"
4. Connect to your GitHub repository: `rishikgoud/CrisisHaven`
5. Render will auto-detect `render.yaml`

### Step 3: Environment Variables
Set these in Render dashboard:

**Backend Service:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crisishaven
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
HF_API_KEY=hf_your_huggingface_api_key_here
OMNIDIM_API_KEY=your_omnidim_api_key_here
OMNIDIM_AGENT_ID=your_agent_id_here
FRONTEND_URL=https://crisishaven-frontend.onrender.com
```

**Frontend Service:**
```
REACT_APP_BACKEND_URL=https://crisishaven-backend.onrender.com
REACT_APP_SOCKET_URL=https://crisishaven-backend.onrender.com
```

### Step 4: Deploy
1. Click "Apply" in Render
2. Wait for both services to deploy (5-10 minutes)
3. Your app will be available at:
   - Frontend: `https://crisishaven-frontend.onrender.com`
   - Backend: `https://crisishaven-backend.onrender.com`

## Vercel Deployment (Alternative)

### Frontend Only
1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set environment variables:
   ```
   REACT_APP_BACKEND_URL=https://crisishaven-backend.onrender.com
   REACT_APP_SOCKET_URL=https://crisishaven-backend.onrender.com
   ```
4. Deploy

## Environment Variables Reference

### Required for Production
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT signing secret | `super_secret_key_123456789` |
| `HF_API_KEY` | HuggingFace API key | `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `OMNIDIM_API_KEY` | OmniDimension API key | `your_omnidim_key` |
| `OMNIDIM_AGENT_ID` | OmniDimension agent ID | `12345` |

### Optional
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `4000` (Render sets automatically) |

## Troubleshooting

### Common Issues
1. **Build fails**: Check if all dependencies are in package.json
2. **Environment variables**: Ensure all required vars are set
3. **MongoDB connection**: Verify connection string and IP whitelist
4. **CORS errors**: Check FRONTEND_URL in backend environment

### Health Checks
- Backend: `https://crisishaven-backend.onrender.com/health`
- Setup: `https://crisishaven-backend.onrender.com/setup`

## Post-Deployment

### Testing
1. Visit your frontend URL
2. Test registration/login
3. Test AI chat functionality
4. Test journal and dashboard
5. Test peer chat

### Monitoring
- Render dashboard shows logs and metrics
- Set up alerts for downtime
- Monitor API usage for HuggingFace

## Security Notes
- Keep JWT_SECRET secure and random
- Use HTTPS in production
- Regularly rotate API keys
- Monitor for suspicious activity

---

**Your CrisisHaven app is now ready for the hackathon! 🎉** 