const {selectCommentByArticleId , selectPostByArticleId} = require("../models/comment-models")

exports.getCommentByArticleId = (req,res,next) => {
    const articleId = req.params.article_id;
    selectCommentByArticleId(articleId)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch((err) => {
        next(err)
    })
    ;
}

exports.postCommentByArticleId = (req,res,next) => {
    
    const { body, username } = req.body;
    const {article_id} = req.params;

    selectPostByArticleId( body , username ,  article_id )
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}
