const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/auth');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'optimal_gallery',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage: storage });

// POST upload gallery (Admin Only)
router.post('/', authMiddleware, upload.array('images', 20), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) return res.status(400).json({ success: false, message: 'Gallery name is required' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: 'At least one image is required' });

    // Multer-storage-cloudinary attaches 'path' with the cloudinary URL
    const imageUrls = req.files.map(file => file.path);
    
    // First image becomes cover, rest (or all) become images array
    const coverImage = imageUrls[0];

    const gallery = new Gallery({
      name,
      description: description || '',
      coverImage,
      images: imageUrls
    });

    await gallery.save();
    res.status(201).json({ success: true, gallery });
  } catch (error) {
    console.error('Error creating gallery:', error);
    res.status(500).json({ success: false, message: 'Server error while creating gallery' });
  }
});

// GET all galleries
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, galleries });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({ success: false, message: 'Server error fetching galleries' });
  }
});

// DELETE a gallery (Admin Only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.json({ success: true, message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting gallery' });
  }
});

module.exports = router;
