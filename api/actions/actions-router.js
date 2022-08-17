const express = require('express')

//bring in middleware routes
const Actions = require('./actions-model')
const router = express.Router();

const { validateActionId, validateActionData, validateActionPost } = require('./actions-middlware')

//make a action route home that runs GET
router.get('/', (req, res, next) => {
  Actions.get()
  .then(action => {
    res.json(action)
  })
  .catch(next)
});

router.get('/:id', validateActionId, (req, res, next) => {
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

router.post('/', validateActionPost, (req, res, next) => {
  Actions.insert({notes: req.notes, description: req.description, project_id: req.project_id})
  .then(result => {
    res.status(201).json(result)
  })
  .catch(next)
})

router.put('/:id', validateActionId, validateActionData, (req, res, next) => {
  Actions.update(req.params.id, 
    {
      notes: req.body.notes, 
      description: req.body.description,
      completed: req.body.completed,
      project_id: req.body.project_id
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
})

router.delete('/:id', async (req, res, next) => {
  try{
  let deletedId = await Actions.remove(req.params.id)
  if(!deletedId){
      res.status(404).json({ message: 'must have valid id' });
    } else {
      res.status(200).json(deletedId)
    } 
  } catch(err){
    next(err)
  }
})


//exporting router 
module.exports = router