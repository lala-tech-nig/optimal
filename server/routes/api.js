const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');

// POST a new lead (public — from the contact/landing page)
router.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, company, industry, inquiryType, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and phone are required'
      });
    }

    const newLead = new Lead({
      name, email, phone,
      company:     company     || '',
      industry:    industry    || '',
      inquiryType: inquiryType || '',
      message:     message     || ''
    });

    await newLead.save();
    res.status(201).json({ success: true, message: 'Your request has been received. We will contact you shortly.' });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting request' });
  }
});

// GET all leads — Protected Admin Route
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching leads' });
  }
});

// GET a single lead — Protected Admin Route
router.get('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching lead' });
  }
});

// PATCH lead status — Protected Admin Route
router.patch('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Server error while updating lead' });
  }
});

// DELETE a lead — Protected Admin Route
router.delete('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting lead' });
  }
});

// GET dashboard stats — Protected Admin Route
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads   = await Lead.countDocuments({ status: 'New' });
    const contacted  = await Lead.countDocuments({ status: 'Contacted' });
    const closed     = await Lead.countDocuments({ status: 'Closed' });

    // Breakdown by inquiry type
    const inquiryBreakdown = await Lead.aggregate([
      { $group: { _id: '$inquiryType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const pageViews = 1205; // Placeholder — replace with real analytics integration

    res.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        contacted,
        closed,
        pageViews,
        conversionRate: totalLeads > 0
          ? `${((totalLeads / pageViews) * 100).toFixed(1)}%`
          : '0%',
        inquiryBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching stats' });
  }
});

module.exports = router;
