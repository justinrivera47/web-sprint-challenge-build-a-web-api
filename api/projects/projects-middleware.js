// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectsId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id)
    if(!project) {
      res.status(404).json({
        message: "project not found"
      })
    } else {
      req.project = project
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding project"
    })
  }
  next()
}

function validateProject(req, res, next) {
  const { name, description } = req.body
  if(!name || !name.trim() || !description) {
    res.status(400).json({ 
      message: 'missing required project field' 
    })
  } else {
    req.name = name.trim()
    req.description = description.trim()
    next()
  }
}

function validateProjectCompleted(req, res, next) {
  const { completed } = req.body
  if(!completed) {
    res.status(400).json({
      message: 'All fields must be provided'
    })
  } else {
    req.completed = completed
    next()
  }
}

module.exports = {
  validateProjectsId,
  validateProject,
  validateProjectCompleted
}