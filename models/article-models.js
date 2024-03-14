const db = require('../db/connection');

exports.selectArticleById = (id) => {
    const query = `
    SELECT 
    articles.*,
    COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `;

    return db.query(query, [id]).then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found' });
        }
        return rows[0];
    });
}

exports.selectAllArticles = (topic, sort_by = "created_at", order = "DESC") => {
    let query = ` SELECT 
    articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id`;

    const queryVals = [];
   

    if (topic) {
        query += ` WHERE  articles.topic = $1`
        queryVals.push(topic)
    }

    // if (sortedBy) {
    //     query += ` WHERE  articles.sortedBy = $2`
    //     queryVals.push(sortedBy)
    // }

    query += ` GROUP BY  articles.article_id`

    const validSortedBy = ['created_at', 'votes', 'author', 'article_id','title','topic', 'comment_count' ];

    if (!validSortedBy.includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'Bad request' });
    }
    else{
        query += ` ORDER BY articles.${sort_by} ${order}`
    }
      
   

    return db.query(query, queryVals).then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found' });
        }
        return rows;
    });
}


exports.selectPatchArticleById= ( newVote , article_id) => {
    return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
    `,[article_id, newVote]).then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'Not Found' });
        }
        return rows;
    });

}


exports.selectPostArticle = (article) => {
    let query = `
    INSERT INTO articles 
        (author, title, body, topic, votes, article_img_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;


const votes = article.votes || 0;

return db.query(query, [article.author, article.title, article.body, article.topic, votes, article.article_img_url])
    .then(({ rows }) => {
        return rows[0]; 
    })
    
}