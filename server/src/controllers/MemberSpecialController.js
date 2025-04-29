const MemberSpecialModel = require('../models/MemberSpecialModel');

class MemberSpecialController {
  async getMemberSpecials(req, res) {
    try {
      const specials = await MemberSpecialModel.getAllMemberSpecials();
      res.json({
        status: 'success',
        data: specials,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  async getActiveMemberSpecials(req, res) {
    try {
      const specials = await MemberSpecialModel.getActiveSpecials();
      res.json({
        status: 'success',
        data: specials,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  async getMemberSpecialsByCategory(req, res) {
    try {
      const specials = await MemberSpecialModel.getSpecialsByCategory(req.params.category);
      res.json({
        status: 'success',
        data: specials,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new MemberSpecialController();