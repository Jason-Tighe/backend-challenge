const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {

    router.post('/note', async (req, res) => {
        // console.log('req', req)
        await auth.requiresLogin(req)
        await validator.create(req)
        await controller.create(req, res)
    })
  
}