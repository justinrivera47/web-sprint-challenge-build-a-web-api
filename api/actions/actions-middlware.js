// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
  try {
    const result = await Action.get(req.params.id)
    if(!result){
      res.status(404).json({ message: 'please enter a valid Id'})
    } else {
      req.result = result
    }
  } catch(err) {
    res.status(500).json({
      message: 'problem finding user' 
    })
  }
  next()
}

async function validateActionData(req, res, next) {
  try{
    const { notes, description, completed, project_id } = req.body
    if(!notes || !description || completed === '' || project_id === ''){
      res.status(400).json({ message: 'Please enter fill out the form'})
    } else {
      req.notes = notes.trim()
      req.description = description.trim()
      req.project_id = project_id
      req.completed = completed
    }
  } catch(err) {
    res.status(500).json({
      message: 'problem finding user' 
    })
  }
  next()
}

async function validateActionPost(req, res, next) {
  try{
    const { notes, description, project_id } = req.body
    if(!notes || !description || project_id === ''){
      res.status(400).json({ message: 'Please enter fill out the form'})
    } else {
      req.notes = notes.trim()
      req.description = description.trim()
      req.project_id = project_id
    }
  } catch(err) {
    res.status(500).json({
      message: 'problem finding user' 
    })
  }
  next()
}

module.exports = { validateActionId, validateActionData, validateActionPost }