const { selectArticleById, selectAllArticles } = require('../models/article-models');

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

exports.getAllArticles = (req,res,next) => {
  selectAllArticles().then((articles) => {

    res.status(200).send({articles})
  }).catch((error) => {
    next(error)
  })
}
