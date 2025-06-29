# 🚀 CrisisHaven Deployment Guide

## GitHub Repository Setup ✅
- Repository: https://github.com/rishikgoud/CrisisHaven
- Status: Code pushed successfully

## Backend Deployment ✅
- **Backend URL**: https://crisishaven.onrender.com
- **Status**: Deployed and running

## Frontend Deployment (Next Step)

### Prerequisites
1. MongoDB Atlas account (free tier) ✅
2. HuggingFace API key ✅
3. OmniDimension API credentials ✅

### Step 1: MongoDB Atlas Setup ✅
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)

### Step 2: Render Frontend Deployment
1. Go to [Render.com](https://render.com)
2. Sign up/login with GitHub
3. Click "New +" → "Static Site"
4. Connect to your GitHub repository: `rishikgoud/CrisisHaven`
5. Configure the deployment:
   - **Name**: `crisishaven-frontend`
   - **Build Command**: `cd crisishavenfrontend && npm install && npm run build`
   - **Publish Directory**: `crisishavenfrontend/build`

### Step 3: Environment Variables
Set these in Render dashboard for the frontend service:

```
REACT_APP_BACKEND_URL=https://crisishaven.onrender.com
REACT_APP_SOCKET_URL=https://crisishaven.onrender.com
REACT_APP_MOCK_API=false
```

### Step 4: Deploy
1. Click "Create Static Site"
2. Wait for deployment (2-3 minutes)
3. Your frontend will be available at: `https://crisishaven-frontend.onrender.com`

## Alternative: Vercel Deployment

### Frontend Only
1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set environment variables:
   ```
   REACT_APP_BACKEND_URL=https://crisishaven.onrender.com
   REACT_APP_SOCKET_URL=https://crisishaven.onrender.com
   ```
4. Deploy

## Environment Variables Reference

### Backend (Already Configured) ✅
| Variable | Description | Status |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Set |
| `JWT_SECRET` | JWT signing secret | ✅ Set |
| `HF_API_KEY` | HuggingFace API key | ✅ Set |
| `OMNIDIM_API_KEY` | OmniDimension API key | ✅ Set |
| `OMNIDIM_AGENT_ID` | OmniDimension agent ID | ✅ Set |
| `FRONTEND_URL` | Frontend URL for CORS | ✅ Set |

### Frontend (To be set)
| Variable | Description | Value |
|----------|-------------|-------|
| `REACT_APP_BACKEND_URL` | Backend API URL | `https://crisishaven.onrender.com` |
| `REACT_APP_SOCKET_URL` | WebSocket URL | `https://crisishaven.onrender.com` |

## Troubleshooting

### Common Issues
1. **Build fails**: Check if all dependencies are in package.json
2. **Environment variables**: Ensure all required vars are set
3. **CORS errors**: Check FRONTEND_URL in backend environment
4. **Socket connection**: Verify WebSocket URL is correct

### Health Checks
- Backend: https://crisishaven.onrender.com/health
- Setup: https://crisishaven.onrender.com/setup

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

**Your CrisisHaven backend is deployed! Now deploy the frontend to complete the setup! 🎉** 