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

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  // Production domains
  'https://optimalconsult.com.ng',
  'https://www.optimalconsult.com.ng',
  'https://optimal-fkiy.onrender.com',
  // Local development
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080',
  'http://localhost:4000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:8080'
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman, server-to-server, mobile apps)
    if (!origin) return callback(null, true);
    // Allow any localhost / 127.0.0.1 port in development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    // Allow explicitly whitelisted origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Block unknown origins in production; allow in dev
    if (process.env.NODE_ENV === 'production') {
      return callback(new Error(`CORS: Origin '${origin}' not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Handle preflight OPTIONS requests for all routes
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

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
