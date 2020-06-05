module.exports = (app, db) => {
  const router = require('express').Router()
  const assert = require('http-assert')
  app.use('/blog/web', router)

  // 获取文章列表
  router.get('/articles', async (req, res) => {
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.time as time,' +
      'article.visits as visits,' +
      'article.type as type,' +
      'article.content as content ' +
      'FROM article'

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

    // 先更新文章访问量
    await db.query(
      `UPDATE article SET visits = visits + 1 WHERE id = ${req.params.id}`
    )

    // 再查询文章
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })

  // 获取所有分类
  router.get('/article_type', async (req, res) => {
    const sql = 'SELECT * FROM article_type'
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

  // 根据id获取分类
  router.get('/type/:id', async (req, res) => {
    const sql = `SELECT id,typeName FROM article_type WHERE id = ${req.params.id}`
    try {
      const result = await db.query(sql)
      res.send(result)
    } catch (error) {
      assert(!error, 500, error)
    }
  })
}
