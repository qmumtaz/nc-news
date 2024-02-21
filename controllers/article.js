const { selectArticleById, selectAllArticles , selectPatchArticleById} = require('../models/article-models');

exports.getArticleById = (req, res, next) => {
    const {article_id} = req.params;
    selectArticleById(article_id)
    .then((article) => {
       
    res.status(200).send({ article : article });
  })
  .catch((error) => {
    if (error) {
      next(error)
    }
    
  });
};

exports.getAllArticles = (req,res,next) => {
  const {topic} = req.query;

  selectAllArticles(topic)
  .then((articles) => {
    res.status(200).send({articles})
  })
  .catch((error) => {
    next(error)
  })
}

exports.updateArticleByArticleId = (req,res,next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  selectPatchArticleById(article_id, inc_votes).then((response) => {
    res.status(200).send({ article: response });
  }).catch((error) => {
    next(error)
  });
}
