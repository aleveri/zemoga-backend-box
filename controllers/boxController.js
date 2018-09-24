var mongoose = require('mongoose');
var Box = mongoose.model("Box");

var BoxController = {};

BoxController.list = async function (req, res) {
  try {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    if (isNaN(page) || isNaN(size)) { throw new Error("Pagination must be numeric"); }
    await Box.find({}).skip(page - 1).limit(size).exec()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

BoxController.save = async function (req, res) {
  var box = new Box(validateData(req.body));
  await box.save()
    .then(x => res.json({}))
    .catch(err => res.json(err));
};

BoxController.update = function (req, res) {
  Box.updateOne({ '_id': req.body._id }, req.body)
    .then(x => res.json({}))
    .catch(err => res.json(err));
};

BoxController.delete = function (req, res) {
  Box.deleteOne({ '_id': req.query.id })
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

function validateData(data) {
  var transform = data.name.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
  data.name = transform;
  transform = data.description.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, '');
  data.description = transform;
  return data;
}

module.exports = BoxController;