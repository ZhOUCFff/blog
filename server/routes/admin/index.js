module.exports = (app, db) => {
  const router = require('express').Router()
  const assert = require('http-assert')
  const loginAuth = require('../../middleware/loginAuth')
  app.use('/blog/admin', loginAuth(app, db), router)

  // 查询文章列表
  router.get('/articles', async (req, res) => {
    const sql = 'SELECT * FROM article'
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 通过id获取文章
  router.get('/article/:id', async (req, res) => {
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.time as time,' +
      'article.visits as visits,' +
      'article.type as type,' +
      'article.content as content ' +
      'FROM article ' +
      `WHERE article.id = ${req.params.id}`

    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 根据分类获取文章
  router.get('/articles/:type', async (req, res) => {
    let sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.time as time,' +
      'article.visits as visits,' +
      'article.type as type,' +
      'article.content as content ' +
      'FROM article ' +
      `WHERE find_in_set(${req.params.type}, type)`
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 增加文章
  router.post('/article', async (req, res) => {
    const sql = 'INSERT INTO article SET ?'
    try {
      const result = await db.query(sql, req.body)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 修改文章
  router.put('/article/:id', async (req, res) => {
    const sql = `UPDATE article SET ? WHERE id = ${req.params.id}`
    try {
      const result = await db.query(sql, req.body)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 删除文章
  router.delete('/article/:id', async (req, res) => {
    const sql = `DELETE FROM article where id = ${req.params.id}`
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 获取文章分类
  router.get('/article_type', async (req, res) => {
    const sql = 'SELECT * FROM article_type'
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })
}
