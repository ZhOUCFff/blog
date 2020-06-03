module.exports = (app, db) => {
  return async (req, res, next) => {
    const assert = require('http-assert')

    assert(req.headers.authorization, 401, '请先登录')

    const token = req.headers.authorization.split(' ').pop()
    assert(token, 401, '请提供jwt token')

    const { id } = require('jsonwebtoken').verify(token, app.get('secret'))
    assert(id, 401, '无效的jwt token')

    const sql = `SELECT username From user WHERE id = '${id}' `
    try {
      req.user = (await db.query(sql))[0]
    } catch (error) {
      assert(!error, 500, error)
    }
    assert(req.user, 401, '该用户不存在')

    next()
  }
}
