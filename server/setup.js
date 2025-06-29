const fs = require('fs');
const path = require('path');

console.log('🔧 CrisisHaven Backend Setup');
console.log('============================\n');

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('If you want to recreate it, delete the existing .env file first.\n');
  process.exit(0);
}

// Create default .env content
const envContent = `# CrisisHaven Backend Environment Variables
# Development Configuration

# Server Configuration
PORT=PORT
NODE_ENV=NODE_ENV


MONGODB_URI=MONGODB_URI

# For local development without MongoDB, you can use:
# MONGODB_URI=mongodb://localhost:27017/crisishaven

# JWT Configuration
JWT_SECRET=JWT_SECRET
JWT_EXPIRES_IN=JWT_EXPIRES_IN

# OmniDimension API Configuration
OMNIDIM_API_KEY=OMNIDIM_API_KEY
OMNIDIM_AGENT_ID=OMNIDIM_AGENT_ID
OMNIDIM_BASE_URL=https://api.omnidim.io

# CORS Configuration
CORS_ORIGIN=CORS_ORIGIN

# Rate Limiting
RATE_LIMIT_WINDOW_MS=RATE_LIMIT_WINDOW_MS
RATE_LIMIT_MAX_REQUESTS=RATE_LIMIT_MAX_REQUESTS

# Security  
BCRYPT_ROUNDS=BCRYPT_ROUNDS
`;

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Update the MONGODB_URI in .env with your actual MongoDB connection');
  console.log('2. Update JWT_SECRET with a secure random string');
  console.log('3. Update OMNIDIM_API_KEY and OMNIDIM_AGENT_ID with your actual credentials');
  console.log('');
  console.log('💡 For MongoDB options:');
  console.log('   - MongoDB Atlas (cloud): Sign up at https://www.mongodb.com/atlas');
  console.log('   - Local MongoDB: Install MongoDB Community Server');
  console.log('   - Docker: Run "docker run -d -p 27017:27017 --name mongodb mongo"');
  console.log('');
  console.log('🚀 Then run: npm run dev');
} catch (error) {
  console.error('❌ Failed to create .env file:', error.message);
  process.exit(1);
} 