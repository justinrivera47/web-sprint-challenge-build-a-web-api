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

router.get('/:id', (req, res, next) => {
  Actions.get(req.params.id)
  .then(result => {
    if(!result){
      res.status(404).json({ message: 'please enter a valid Id'})
    } else {
      res.status(200).json(result)
    }
  })
  .catch(err => {
    next(err)
  })
});


//exporting router 
module.exports = router