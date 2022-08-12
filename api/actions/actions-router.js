const express = require('express')

//bring in middleware routes

const Actions = require('./actions-model')


const router = express.Router();

//make a action route home that runs GET
router.get('/', (req, res, next) => {
  Actions.get()
  .then(action => {
    res.json(action)
  })
  .catch(next)
});

//exporting router 
module.exports = router