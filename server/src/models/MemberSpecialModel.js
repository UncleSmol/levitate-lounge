const db = require('../config/database');

class MemberSpecialModel {
  async getAllMemberSpecials() {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM member_specials
        WHERE is_deleted = 0
        ORDER BY display_order DESC, created_at DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching member specials: ${error.message}`);
    }
  }

  async getActiveSpecials() {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM member_specials
        WHERE is_active = 1
          AND is_deleted = 0
          AND valid_from <= NOW()
          AND (valid_until IS NULL OR valid_until >= NOW())
        ORDER BY display_order DESC, created_at DESC
      `);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching active specials: ${error.message}`);
    }
  }

  async getSpecialsByCategory(category) {
    try {
      const [rows] = await db.query(`
        SELECT *
        FROM member_specials
        WHERE category = ?
          AND is_deleted = 0
        ORDER BY display_order DESC, created_at DESC
      `, [category]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching ${category} specials: ${error.message}`);
    }
  }
}

module.exports = new MemberSpecialModel();