const controller = require('./controller')
const notesController = require('../notes/controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  router.get('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await controller.read(req, res)
  })

  router.put('/user/:id', async (req, res) => {
    await auth.requiresCurrentUser(req)
    await validator.update(req)
    await controller.update(req, res)
  })

  router.get('/user/:id/notes', async (req, res) => {
      // list all notes for that user
      // make sure the userId in the url matches the current user
      await auth.requiresCurrentUser(req)
      await validator.checkUserId(req)
      // let's put this in it's own controller
      await notesController.readAll(req, res)
  })
}
