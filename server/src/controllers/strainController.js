const StrainModel = require('../models/strainModel');

class StrainController {
  async getStrains(req, res) {
    try {
      const strains = await StrainModel.getAllStrains();
      res.json({
        status: 'success',
        data: strains,
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

module.exports = new StrainController();