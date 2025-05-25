const noteService = require('app/modules/notes');

/**
 * @method read
 */

exports.readAll = async (req, res) => {
  //no notes yet include the fallback
  const notes = await noteService.find({userId: req.params.id}) || [];
  res.status(200).send(notes);
}


/**
 * @method create
 */

exports.create = async (req, res) => {
  const note = await noteService.create({
    userId: req.userId,
    title: req.body.title,
    message: req.body.message
  });
  res.status(201).send(note);
}