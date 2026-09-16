const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');
const dbStore = require('../services/dbStore');

// Check if Cloudinary is configured
const hasCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  process.env.CLOUDINARY_CLOUD_NAME !== 'demo' &&
  process.env.CLOUDINARY_API_KEY !== 'demo'
);

let storage;

if (hasCloudinary) {
  try {
    const { v2: cloudinary } = require('cloudinary');
    const { CloudinaryStorage } = require('multer-storage-cloudinary');
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'optimal_gallery',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
      }
    });
    console.log('☁️ Cloudinary configured for gallery uploads');
  } catch (err) {
    console.warn('⚠️ Cloudinary setup error, falling back to local disk storage:', err.message);
  }
}

// Fallback to local disk storage
if (!storage) {
  const uploadDir = path.join(__dirname, '..', 'uploads', 'gallery');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
      const safeName = file.originalname.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
      cb(null, `gallery_${Date.now()}_${safeName}${ext}`);
    }
  });
  console.log('📁 Local disk storage configured for gallery uploads (uploads/gallery)');
}

const fileFilter = (req, file, cb) => {
  if (/image\/(jpeg|jpg|png|webp|gif)/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WEBP, GIF) are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per image
  fileFilter: fileFilter
});

// ─── POST /api/gallery (Protected Admin Only) ─────────────────────────────────
router.post('/', authMiddleware, upload.array('images', 20), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Gallery name is required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    // Resolve URLs: Cloudinary provides file.path (full URL), local disk provides file.filename
    const imageUrls = req.files.map(file => {
      if (file.path && file.path.startsWith('http')) {
        return file.path;
      }
      return `/uploads/gallery/${file.filename}`;
    });

    const coverImage = imageUrls[0];

    const galleryData = {
      name: name.trim(),
      description: (description || '').trim(),
      coverImage,
      images: imageUrls
    };

    const gallery = await dbStore.createGallery(galleryData);
    res.status(201).json({ success: true, message: 'Gallery album created successfully', gallery });
  } catch (error) {
    console.error('Error creating gallery:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error while creating gallery' });
  }
});

// ─── GET /api/gallery (Public) ────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const galleries = await dbStore.getAllGalleries();
    res.json({ success: true, count: galleries.length, galleries });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching galleries' });
  }
});

// ─── DELETE /api/gallery/:id (Protected Admin Only) ───────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const gallery = await dbStore.deleteGallery(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery album not found' });
    res.json({ success: true, message: 'Gallery album deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    res.status(500).json({ success: false, message: 'Server error deleting gallery' });
  }
});

module.exports = router;
