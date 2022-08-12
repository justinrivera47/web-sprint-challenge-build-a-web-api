const express = require('express');
const helmet = require('helmet')
const server = express();
// const actionMiddleWare = require('./actions/actions-middlware')
const actionRouter = require('./actions/actions-router')
// const projectMiddleWare = require('./projects/projects-middleware')
const projectRouter = require('./projects/projects-router.js')


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(helmet())
server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('*', (req, res) => {
  res.status(404).json({
    message: 'We have an error coming in hot'})
})

module.exports = server;
