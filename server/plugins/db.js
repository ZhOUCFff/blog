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
    if (err) throw new Error(err)
    console.log('数据库连接成功')
  })

  connection.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connection.connect(err => {
        if (err) throw new Error(err)
        console.log('数据库重连成功')
      })
    }
  })

  let pingInterval = null
  pingInterval = setInterval(() => {
    connection.ping(err => {
      if (err) throw new Error(err)
    })
  }, 3600000)

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
