var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
    boxId: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Vote', voteSchema);