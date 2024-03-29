const db = require("../db/connection");

exports.selectCommentByArticleId = (id) => {
  return db
    .query(
      `SELECT 
        comments.comment_id,
        comments.votes,
        comments.created_at,
        comments.author,
        comments.body,
        comments.article_id
        FROM comments
        JOIN articles on articles.article_id = comments.article_id
        WHERE comments.article_id = $1`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
};

exports.selectPostByArticleId = (body, author, article_id) => {
  return db
    .query(
      `INSERT INTO comments 
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [body, author, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      if (rows[0].author === undefined) {
        return Promise.reject({
          status: 404,
          msg: "username does not exist or has not been found.",
        });
      }

      return rows[0];
    });
};

exports.selectDeleteCommentById = (comment_id) => {
  return db
    .query(
      `
           DELETE FROM comments
           WHERE comment_id = $1
           RETURNING *;
           `,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return rows;
    });
};

exports.selectPatchCommentByCommentId = (inc_votes, comment_id) => {
  return db
    .query(
      `UPDATE comments
       SET votes = votes + $1
       WHERE comment_id = $2
       RETURNING *`,
      [inc_votes, comment_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({status: 404 , msg: "comment not found"})
      }

      return rows;
    });
};
