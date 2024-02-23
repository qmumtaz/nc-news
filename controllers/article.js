const { selectArticleById, selectAllArticles , selectPatchArticleById, selectPostArticle} = require('../models/article-models');

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
  const {sort_by} = req.query;
  const {order} = req.query;
  
  selectAllArticles(topic, sort_by,order)
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

exports.postArticle = (req,res,next) => {
  const { author, title, body, topic , article_img_url } = req.body;

  const articleData = {
      author,
      title,
      body,
      topic,
      article_img_url: article_img_url || "https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?w=700&h=700"
  };

    selectPostArticle(articleData).then((response) => {
      
    res.status(201).send({article : response})
    }).catch((err) =>{
      next(err)
    })
}