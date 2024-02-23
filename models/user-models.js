const db = require("../db/connection")


exports.selectAllUsers = () => {
    return db.query(`SELECT * FROM users;`).then(({rows}) => {
      return rows
    }) 
}

exports.selectUserName = (username) => {
  return db.query(`SELECT * FROM users where users.username = $1;`, [username]).then(({rows}) => {
        if (rows.length === 0) {
          return Promise.reject({status : 404 , msg : "Not found"})
        }
    return rows;
  }) 
}