const { getAllTopicsFromDatabase } = require('../models/topic-models');

exports.getAllTopics = (req, res, next) => {
  getAllTopicsFromDatabase().then((topics) => {
    res.status(200).send({ topics : topics.rows });
  });
};
