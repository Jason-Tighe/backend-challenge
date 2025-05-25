const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {

    router.post('/note', async (req, res) => {
        await auth.requiresCurrentUser(req)
        await controller.create(req)
    })
  
}