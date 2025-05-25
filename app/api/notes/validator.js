const { validate, Validator } = require('app/api/common')
const { body } = validate

class NoteValidator extends Validator {
    // make sure the fields aren't empty
    async create(req) {
        const validations = [
            body('title').isLength(1, 64),
            body('message').isLength(1, 64),
            body('userId').exists()
        ]
        await this.validate(req, validations, { sanitize: 'body' })
    }

}

module.exports = new NoteValidator()