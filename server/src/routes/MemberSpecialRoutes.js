const express = require('express');
const router = express.Router();
const MemberSpecialController = require('../controllers/MemberSpecialController');

// Get all member specials
router.get('/member-specials', MemberSpecialController.getMemberSpecials);

// Get active member specials
router.get('/member-specials/active', MemberSpecialController.getActiveMemberSpecials);

// Get member specials by category
router.get('/member-specials/category/:category', MemberSpecialController.getMemberSpecialsByCategory);

module.exports = router;