const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

app.prepare().then(() => {
  const server = express()
  // server.get('/detail/:id', (req, res) => {
  //   const actualPage = `/detail`
  //   const queryParams = { id: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })
  server.get('*', (req, res) => {
    return app.getRequestHandler()(req, res)
  })
  server.listen(3005, err => {
    console.log('http://localhost:3005')
  })
})
