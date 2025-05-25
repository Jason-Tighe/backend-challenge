const { validate, Validator } = require('app/api/common')
const { param } = require('../common/validate')
const { body } = validate

class UserValidator extends Validator {
  async update(req) {
    const validations = [
      body('email').optional().isEmail(),
      body('firstName').optional().isLength(1, 64),
      body('lastName').optional().isLength(1, 64)
    ]
    await this.validate(req, validations, { sanitize: 'query' })
  }

  async checkUserId(req) {
    const validations = [
      // grab the user id from the params
      param('id').custom((value, { req }) => {
        if (req.userId !== value) {
          throw new Error('User ID does not match authenticated user')
        }
        return true
      })
    ]
    await this.validate(req, validations, { sanitize: 'params' })
  }
}

module.exports = new UserValidator()
