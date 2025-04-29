const db = require('../config/database');

class StrainModel {
  async getAllStrains() {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM strains
        ORDER BY created_at DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching strains: ${error.message}`);
    }
  }

  async getStrainsByCategory(category) {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM strains
        WHERE category = ?
        ORDER BY created_at DESC
      `, [category]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching strains by category: ${error.message}`);
    }
  }

  async getSpecials() {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM strains
        WHERE is_on_special = true
        ORDER BY created_at DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching special offers: ${error.message}`);
    }
  }

  async getStrainById(id) {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM strains
        WHERE id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error fetching strain: ${error.message}`);
    }
  }
}

module.exports = new StrainModel();