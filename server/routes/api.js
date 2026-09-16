const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const dbStore = require('../services/dbStore');

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── POST /api/leads (Public — from Contact / Homepage) ──────────────────────
router.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, company, industry, inquiryType, message } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Your full name is required' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ success: false, message: 'A valid email address is required' });
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email format' });
    }
    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'A contact phone number is required' });
    }

    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: (company || '').trim(),
      industry: (industry || '').trim(),
      inquiryType: (inquiryType || 'General Consultation').trim(),
      message: (message || '').trim()
    };

    const newLead = await dbStore.createLead(leadData);

    res.status(201).json({
      success: true,
      message: 'Your request has been received. Our lead consultant will contact you within 24 hours.',
      leadId: newLead._id
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting request. Please try again.' });
  }
});

// ─── GET /api/leads (Protected Admin Route) ─────────────────────────────────
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const { status, search } = req.query;
    let leads = await dbStore.getAllLeads({ status });

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.trim().toLowerCase();
      leads = leads.filter(l =>
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q)) ||
        (l.company && l.company.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: leads.length, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching leads' });
  }
});

// ─── GET /api/leads/:id (Protected Admin Route) ──────────────────────────────
router.get('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await dbStore.getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching lead' });
  }
});

// ─── PATCH /api/leads/:id (Protected Admin Route) ────────────────────────────
router.patch('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['New', 'Contacted', 'Closed'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;

    const lead = await dbStore.updateLead(req.params.id, updates);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    res.json({ success: true, message: 'Lead updated successfully', lead });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, message: 'Server error while updating lead' });
  }
});

// ─── DELETE /api/leads/:id (Protected Admin Route) ───────────────────────────
router.delete('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await dbStore.deleteLead(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting lead' });
  }
});

// ─── GET /api/stats (Protected Admin Route) ──────────────────────────────────
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await dbStore.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching stats' });
  }
});

module.exports = router;
