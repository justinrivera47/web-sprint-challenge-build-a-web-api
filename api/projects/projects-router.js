// Write your "projects" router here!
const express = require('express')

//bring in middleware routes

const Projects = require('./projects-model')

const router = express.Router();

const { validateProjectsId, validateProject, validateProjectCompleted } = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Projects.get()
  .then(project => {
    res.json(project)
  })
  .catch(next)
});

router.get('/:id', validateProjectsId, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert({name: req.name, description: req.description, completed: req.body.completed})
    .then(projects => {
      res.status(201).json(projects)
    })
    .catch(next)
});

router.put('/:id', 
validateProjectsId,
validateProjectCompleted,
validateProject,
async (req, res, next) => {
  try {
    const updateProject = await Projects.update(
      req.params.id, {
        name: req.body.name, 
        description: req.body.description,
        completed: req.completed
      })
    res.json(updateProject)
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', validateProjectsId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id)
    res.json(req.project)
  } catch(err) {
    next(err)
  }
})

router.get('/api/projects/:id/actions', validateProjectsId, async (req, res, next) => {
  try {
  const results = await Projects.getProjectActions(req.params.id);
  res.json(results)
} catch(err) {
  next(err)
}
})

//exporting router 
module.exports = router