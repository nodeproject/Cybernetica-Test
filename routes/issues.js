var express = require('express');
var router = express.Router();
var request = require('request');

/* GET pulls info from GitHub API */
var pullOptions = {
  url: 'https://api.github.com/repos/nodeproject/Cybernetica-Test/pulls',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token b43fe9619cd98460cd8e566db91dd0d658b3ab4a'
  }
};

function pullCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
    pulls = JSON.parse(body);
  }
}

request(pullOptions, pullCallback);

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('issues', {
    pull: pulls,
    title: "Issues"
  });
});



module.exports = router;
