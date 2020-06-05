module.exports = (app, db) => {
  const router = require('express').Router()
  const assert = require('http-assert')
  const moment = require('moment')
  app.use('/blog/web', router)

  // 数据处理函数
  const handleArticleList = (data = [], typeList = []) => {
    return data.map(item => {
      item.key = item.id
      item.time = moment(item.time).format('YYYY-MM-DD HH:mm:ss')
      item.type = typeList
        .filter(type => item.type.split(',').map(Number).includes(type.id))
        .map(type => type)
      return item
    })
  }

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
      const typeList = await db.query('SELECT * FROM article_type')
      const result = await db.query(sql)
      res.send(handleArticleList(result, typeList))
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
      const typeList = await db.query('SELECT * FROM article_type')
      const result = await db.query(sql)
      res.send(handleArticleList(result, typeList))
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
      const typeList = await db.query('SELECT * FROM article_type')
      const result = await db.query(sql)
      res.send(handleArticleList(result, typeList))
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
