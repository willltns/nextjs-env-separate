const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')

// Proxy configuration.
const devProxy = {
  // '/xdnphb': {
  //   target: 'http://dev.a.newrank.cn/',
  //   changeOrigin: true
  // }
}

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Set up the proxy.
  if (dev) {
    const proxyMiddleware = require('http-proxy-middleware')
    Object.keys(devProxy).forEach(function(context) {
      server.use(proxyMiddleware(context, devProxy[context]))
    })
  }

  server.use(cookieParser())

  server.get('*', (req, res) => handler(req, res))

  server.listen(3333, err => {
    if (err) throw err
    console.log('Server ready on http://localhost:3333')
  })
})
