const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Lead = require('../models/Lead');
const Admin = require('../models/Admin');
const Gallery = require('../models/Gallery');

// In-memory fallback storage for when MongoDB is disconnected/unreachable
const memoryStore = {
  admins: [
    {
      _id: 'mem-admin-1',
      email: 'admin@optimalconsult.com.ng',
      passwordHash: bcrypt.hashSync('Password123!', 10),
      name: 'Optimal Admin',
      createdAt: new Date()
    }
  ],
  leads: [
    {
      _id: 'mem-lead-1',
      name: 'Dr. Chidi Okafor',
      email: 'c.okafor@africagas.com',
      phone: '+234 803 123 4567',
      company: 'Africa Gas & Petroleum Ltd',
      industry: 'Oil & Gas',
      inquiryType: 'ISO 9001 – Quality Management',
      message: 'We are seeking ISO 9001 and ISO 45001 certification consultation for our Port Harcourt operations.',
      notes: 'Initial contact made. Requested comprehensive proposal by Friday.',
      status: 'Contacted',
      createdAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      _id: 'mem-lead-2',
      name: 'Amina Bello',
      email: 'amina@bellologistics.ng',
      phone: '+234 802 987 6543',
      company: 'Bello Logistics Nigeria',
      industry: 'Transportation & Logistics',
      inquiryType: 'ISO 14001 – Environmental',
      message: 'Need complete gap analysis for our nationwide haulage fleet compliance.',
      notes: '',
      status: 'New',
      createdAt: new Date(Date.now() - 3600000 * 4)
    }
  ],
  galleries: [
    {
      _id: 'mem-gal-1',
      name: 'ISO 9001 Lead Auditor Training Seminar',
      description: 'Intensive corporate executive sessions on Quality Management System compliance, hazard mitigation, and internal audit mechanisms.',
      coverImage: 'assets/trainingphoto1.jpg',
      images: [
        'assets/trainingphoto1.jpg',
        'assets/trainingphoto2.jpg',
        'assets/training1.jpg',
        'assets/training2.jpg',
        'assets/training3.jpg',
        'assets/training4.jpg'
      ],
      createdAt: new Date(Date.now() - 86400000 * 10)
    },
    {
      _id: 'mem-gal-2',
      name: 'Industrial Safety & OH&S Workshop',
      description: 'Hands-on practical demonstrations of workplace emergency response, risk evaluations, and international ISO 45001 compliance standards.',
      coverImage: 'assets/collagesecond1.jpg',
      images: [
        'assets/collagesecond1.jpg',
        'assets/collage1.jpg',
        'assets/collage2.jpg',
        'assets/collage3.jpg',
        'assets/collagesecond2.jpg',
        'assets/collagesecond3.jpg'
      ],
      createdAt: new Date(Date.now() - 86400000 * 5)
    }
  ]
};

function isDbConnected() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

// ─── LEAD METHODS ─────────────────────────────────────────────────────────────

async function createLead(data) {
  if (isDbConnected()) {
    const lead = new Lead(data);
    return await lead.save();
  }
  const newLead = {
    _id: 'mem-lead-' + Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company || '',
    industry: data.industry || '',
    inquiryType: data.inquiryType || 'General Consultation',
    message: data.message || '',
    notes: data.notes || '',
    status: 'New',
    createdAt: new Date()
  };
  memoryStore.leads.unshift(newLead);
  return newLead;
}

async function getAllLeads(filters = {}) {
  if (isDbConnected()) {
    const query = {};
    if (filters.status && filters.status !== 'All') {
      query.status = filters.status;
    }
    return await Lead.find(query).sort({ createdAt: -1 });
  }
  let list = [...memoryStore.leads];
  if (filters.status && filters.status !== 'All') {
    list = list.filter(l => l.status === filters.status);
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function getLeadById(id) {
  if (isDbConnected()) {
    return await Lead.findById(id);
  }
  return memoryStore.leads.find(l => l._id.toString() === id.toString()) || null;
}

async function updateLead(id, updates) {
  if (isDbConnected()) {
    return await Lead.findByIdAndUpdate(id, updates, { new: true });
  }
  const lead = memoryStore.leads.find(l => l._id.toString() === id.toString());
  if (!lead) return null;
  if (updates.status !== undefined) lead.status = updates.status;
  if (updates.notes !== undefined) lead.notes = updates.notes;
  return lead;
}

async function deleteLead(id) {
  if (isDbConnected()) {
    return await Lead.findByIdAndDelete(id);
  }
  const index = memoryStore.leads.findIndex(l => l._id.toString() === id.toString());
  if (index === -1) return null;
  const removed = memoryStore.leads.splice(index, 1);
  return removed[0];
}

async function getStats() {
  if (isDbConnected()) {
    const totalLeads = await Lead.countDocuments();
    const newLeads   = await Lead.countDocuments({ status: 'New' });
    const contacted  = await Lead.countDocuments({ status: 'Contacted' });
    const closed     = await Lead.countDocuments({ status: 'Closed' });

    const inquiryBreakdown = await Lead.aggregate([
      { $group: { _id: '$inquiryType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const pageViews = 1205;

    return {
      totalLeads,
      newLeads,
      contacted,
      closed,
      pageViews,
      conversionRate: totalLeads > 0
        ? `${((totalLeads / pageViews) * 100).toFixed(1)}%`
        : '0%',
      inquiryBreakdown: inquiryBreakdown.map(i => ({ type: i._id || 'General', count: i.count }))
    };
  }

  const leads = memoryStore.leads;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contacted = leads.filter(l => l.status === 'Contacted').length;
  const closed = leads.filter(l => l.status === 'Closed').length;

  const counts = {};
  leads.forEach(l => {
    const k = l.inquiryType || 'General';
    counts[k] = (counts[k] || 0) + 1;
  });
  const inquiryBreakdown = Object.entries(counts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  const pageViews = 1205;
  return {
    totalLeads,
    newLeads,
    contacted,
    closed,
    pageViews,
    conversionRate: totalLeads > 0
      ? `${((totalLeads / pageViews) * 100).toFixed(1)}%`
      : '0%',
    inquiryBreakdown
  };
}

// ─── ADMIN METHODS ────────────────────────────────────────────────────────────

async function findAdminByEmail(email) {
  if (isDbConnected()) {
    return await Admin.findOne({ email });
  }
  const admin = memoryStore.admins.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!admin) return null;
  return {
    _id: admin._id,
    email: admin.email,
    name: admin.name,
    comparePassword: async function(password) {
      return await bcrypt.compare(password, admin.passwordHash);
    }
  };
}

async function updateAdminProfile(id, { name, email }) {
  if (isDbConnected()) {
    return await Admin.findByIdAndUpdate(id, { name, email }, { new: true });
  }
  const admin = memoryStore.admins.find(a => a._id.toString() === id.toString());
  if (!admin) return null;
  if (name) admin.name = name;
  if (email) admin.email = email;
  return { _id: admin._id, email: admin.email, name: admin.name };
}

async function changeAdminPassword(id, newPassword) {
  const hash = await bcrypt.hash(newPassword, 10);
  if (isDbConnected()) {
    const admin = await Admin.findById(id);
    if (!admin) return false;
    admin.password = newPassword;
    await admin.save();
    return true;
  }
  const admin = memoryStore.admins.find(a => a._id.toString() === id.toString());
  if (!admin) return false;
  admin.passwordHash = hash;
  return true;
}

// ─── GALLERY METHODS ──────────────────────────────────────────────────────────

async function getAllGalleries() {
  if (isDbConnected()) {
    return await Gallery.find().sort({ createdAt: -1 });
  }
  return [...memoryStore.galleries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function createGallery(data) {
  if (isDbConnected()) {
    const gallery = new Gallery(data);
    return await gallery.save();
  }
  const newGal = {
    _id: 'mem-gal-' + Date.now(),
    name: data.name,
    description: data.description || '',
    coverImage: data.coverImage,
    images: data.images || [data.coverImage],
    createdAt: new Date()
  };
  memoryStore.galleries.unshift(newGal);
  return newGal;
}

async function deleteGallery(id) {
  if (isDbConnected()) {
    return await Gallery.findByIdAndDelete(id);
  }
  const idx = memoryStore.galleries.findIndex(g => g._id.toString() === id.toString());
  if (idx === -1) return null;
  const removed = memoryStore.galleries.splice(idx, 1);
  return removed[0];
}

module.exports = {
  isDbConnected,
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getStats,
  findAdminByEmail,
  updateAdminProfile,
  changeAdminPassword,
  getAllGalleries,
  createGallery,
  deleteGallery
};
