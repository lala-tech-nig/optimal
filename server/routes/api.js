const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');

// POST a new lead (from the public landing page)
router.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, company, industry, inquiryType, message } = req.body;
    
    const newLead = new Lead({
      name, email, phone, company, industry, inquiryType, message
    });
    
    await newLead.save();
    res.status(201).json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting lead' });
  }
});

// GET all leads (Protected Admin Route)
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching leads' });
  }
});

// GET dashboard stats (Protected Admin Route)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'New' });
    
    // In a real app, you might track page views in a separate Analytics collection
    // For now, let's return a dummy structure for page views
    res.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        pageViews: 1205, // Placeholder for analytics
        conversionRate: `${((totalLeads / 1205) * 100).toFixed(1)}%`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while fetching stats' });
  }
});

// PATCH lead status (Protected Admin Route)
router.patch('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error while updating lead' });
  }
});

module.exports = router;
