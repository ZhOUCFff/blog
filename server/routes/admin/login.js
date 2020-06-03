module.exports = (app, db) => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  app.post('/blog/admin/login', async (req, res) => {
    const { username, password } = req.body
    const sql = `SELECT id,username From user WHERE username = '${username}' AND password = '${password}'`

    try {
      const result = (await db.query(sql))[0]
      assert(result, 422, '用户名或密码错误')
      const token = jwt.sign({ id: result.id }, app.get('secret'))
      res.send({
        message: '登陆成功',
        token,
      })
    } catch (error) {
      assert(!error, 500, error)
    }
  })
}
