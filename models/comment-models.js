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