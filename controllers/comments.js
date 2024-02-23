const {selectCommentByArticleId , selectPostByArticleId, selectDeleteCommentById , selectPatchCommentByCommentId} = require("../models/comment-models")

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

exports.deleteCommentByCommentId = (req,res,next) => {
    const {comment_id} = req.params;

    selectDeleteCommentById(comment_id).then((response)=> {
      res.status(204).send();
    }).catch((err) => {
      next(err)
    });
}

exports.patchCommentByCommentId = (req,res,next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  
  selectPatchCommentByCommentId(inc_votes, comment_id).then((response) => {
      res.status(200).send({comment : response[0]})
  }).catch((err) => {
    next(err)
  })
}