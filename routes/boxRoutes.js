var express = require('express');
var router = express.Router();
var box = require('../controllers/boxController.js');
var vote = require('../controllers/voteController.js');

router.get('/list', box.list);

router.get('/votesPerUser', vote.countVotesPerUser);

router.post('/save', vote.save);

module.exports = router;