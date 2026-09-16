const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

const app = express();

// Ensure upload directories exist for local file uploads
const uploadsDir = path.join(__dirname, 'uploads', 'gallery');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Universal CORS & Preflight Middleware (supports optimalconsult.com.ng, localhost, and all clients)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');

  // Handle preflight OPTIONS request immediately
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.use(cors({
  origin: true, // Dynamically reflect origin to support credentials across optimalconsult.com.ng and localhost
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    ok: true,
    status: 'Optimal Management Consultancy API running',
    timestamp: new Date().toISOString(),
    db: isConnected ? 'mongodb_connected' : 'memory_fallback_active',
    port: process.env.PORT || 5000
  });
});

// ─── Connect to MongoDB (Non-blocking & Graceful) ────────────────────────────
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/optimal_consultancy';
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Seed default admin if none exists in MongoDB
    const Admin = require('./models/Admin');
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      const defaultAdmin = new Admin({
        email: 'admin@optimalconsult.com.ng',
        password: 'Password123!',
        name: 'Optimal Admin'
      });
      await defaultAdmin.save();
      console.log('🔐 Default admin initialized: admin@optimalconsult.com.ng / Password123!');
    }
  } catch (error) {
    console.warn(`⚠️ MongoDB connection: ${error.message}`);
    console.warn('💡 Server operating with in-memory storage fallback. To persist to MongoDB, configure MONGO_URI in .env');
  }
};

connectDB();

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Optimal Backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
