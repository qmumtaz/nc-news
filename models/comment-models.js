const db = require('../db/connection');

exports.selectCommentByArticleId = (id) => {
    return db.query(
        `SELECT * FROM comments
        join articles on articles.article_id = comments.article_id
        WHERE article_id = $1`, [id]
        );
}