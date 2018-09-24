var mongoose = require('mongoose');
var Vote = mongoose.model("Vote");

var VoteController = {};

VoteController.list = async function (req, res) {
  try {
    var page = parseInt(req.query.page);
    var size = parseInt(req.query.size);
    if (isNaN(page) || isNaN(size)) { throw new Error("Pagination must be numeric"); }
    await Vote.find({}).skip(page - 1).limit(size).exec()
      .then(data => res.json(data))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

VoteController.countVotesPerUser = async function (req, res) {
  try {
    await Vote.find({ 'userId': req.query.userId }).exec()
      .then(data => res.json(data.length))
      .catch(err => res.json(err));
  } catch (error) {
    res.status(400).send(error.message);
  }
};

VoteController.save = function (req, res) {
  Vote.find({ 'userId': req.body.userId, 'boxId': req.body.boxId }).exec()
    .then(data => {
      try {
        if (data.length > 2) {
          throw new Error("Limit Exceed");
        }
        if (data.length < 3) {
          var vote = new Vote(req.body);
          vote.save()
            .then(x => res.json({}))
            .catch(err => res.json(err));
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
    })
    .catch(err => res.json(err));



};

VoteController.update = function (req, res) {
  Vote.updateOne({ '_id': req.body._id }, req.body)
    .then(x => res.json({}))
    .catch(err => res.json(err));
};

VoteController.delete = function (req, res) {
  Vote.deleteOne({ '_id': req.query.id })
    .then(x => { res.json({}) })
    .catch(err => res.json(err));
};

module.exports = VoteController;