const db = require('../db/connection');

exports.selectCommentByArticleId = (id) => {
    return db.query(
        `SELECT 
        comments.comment_id,
        comments.votes,
        comments.created_at,
        comments.author,
        comments.body,
        comments.article_id
        FROM comments
        JOIN articles on articles.article_id = comments.article_id
        WHERE comments.article_id = $1`, [id]
        ).then(({rows}) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not Found' });
            }
            return rows;
        });
}

  
exports.selectPostByArticleId = (body, author, article_id) => {
    return db.query(
      `INSERT INTO comments 
        (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [body, author, article_id]
    ).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return rows[0];
    });
  };
  