const express = require('express');
const router = express.Router();
const strainModel = require('../models/strainModel');

// Get all strains
router.get('/strains', async (req, res) => {
  try {
    const strains = await strainModel.getAllStrains();
    res.json(strains);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Get strains by category
router.get('/strains/category/:category', async (req, res) => {
  try {
    const strains = await strainModel.getStrainsByCategory(req.params.category);
    res.json(strains);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Get special offers
router.get('/strains/specials', async (req, res) => {
  try {
    const strains = await strainModel.getSpecials();
    res.json(strains);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

module.exports = router;