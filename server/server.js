const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const cookieParser = require('cookie-parser');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/optimal_consultancy');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default admin if none exists
    const adminExists = await Admin.findOne();
    if (!adminExists) {
      const defaultAdmin = new Admin({
        email: 'admin@optimalconsult.com.ng',
        password: 'password123',
        name: 'Optimal Admin'
      });
      await defaultAdmin.save();
      console.log('Default admin created: admin@optimal.com / password123');
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api', require('./routes/api'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gallery', require('./routes/gallery'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
