const { selectArticleById } = require('../models/article-models');

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleById(article_id).then((article) => {
       
    res.status(200).send({ article : article });
  }).catch((error) => {
    if (error) {
      next(error)
    }
    
  });
};
