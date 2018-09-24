var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var boxSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model('Box', boxSchema);