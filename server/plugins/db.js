module.exports = app => {
  const mysql = require('mysql')
  const connection = mysql.createConnection({
    host: '47.105.164.155',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'blog',
    useConnectionPooling: true,
  })
  connection.connect(err => {
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
