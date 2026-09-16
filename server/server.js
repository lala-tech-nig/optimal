const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config();

const app = express();

// CORS — allow all localhost ports, file:// origin (null), and production CLIENT_URL
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:8080',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (file://, curl, Postman, mobile apps)
    if (!origin) return callback(null, true);
    // Allow any localhost/127.0.0.1 port
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    // Allow explicitly configured origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    status: 'Optimal API running',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/optimal_consultancy'
    );
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Seed default admin if none exists
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      const defaultAdmin = new Admin({
        email: 'admin@optimalconsult.com.ng',
        password: 'Password123!',
        name: 'Optimal Admin'
      });
      await defaultAdmin.save();
      console.log('🔐 Default admin created: admin@optimalconsult.com.ng / Password123!');
    }
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
