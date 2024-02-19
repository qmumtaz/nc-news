const db = require('../db/connection');

exports.getAllTopicsFromDatabase = () => {
  return db.query('SELECT * FROM topics');
};