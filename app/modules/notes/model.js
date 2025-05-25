const { Model } = require('app/modules/common')

class NoteModel extends Model {
  schema() {
    return {
     userId: {
        type: String,
        ref: 'User',
        required: true,
        index: true
      },
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      }
    }
  }
}

module.exports = NoteModel