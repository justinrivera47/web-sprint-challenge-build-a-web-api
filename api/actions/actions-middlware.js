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

module.exports = validateActionId