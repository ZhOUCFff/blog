module.exports = app => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '19970601',
    database: 'blog',
  })
  connection.connect(err => {
    if (err) throw err
    console.log('数据库连接成功')
  })

  return {
    query(sql, params = null) {
      return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
          err ? reject(err) : resolve(result)
        })
      })
    },
  }
}
