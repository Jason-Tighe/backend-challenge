const noteService = require('app/modules/notes');

/**
 * @method read
 */

exports.readAll = async (req, res) => {
  //no notes yet include the fallback
  const notes = await noteService.find({userId: req.params.id}) || [];
  res.status(200).send(notes);
}