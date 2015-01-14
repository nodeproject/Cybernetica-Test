var express = require('express');
var router = express.Router();
var request = require('request');

/* GET repos from GitHub API */
var repoOptions = {
  url: 'https://api.github.com/users/nodeproject/repos',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token b43fe9619cd98460cd8e566db91dd0d658b3ab4a'
  }
};

function repoCallback(error, response, body) {
    if (!error && response.statusCode == 200) {
      repos = JSON.parse(body);
    }
}

request(repoOptions, repoCallback);

/* GET events from GitHub API */
var eventOptions = {
  url: 'https://api.github.com/users/nodeproject/events',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token b43fe9619cd98460cd8e566db91dd0d658b3ab4a'
  }
};

function eventCallback(error, response, body) {
  if (!error && response.statusCode == 200) {
    events = JSON.parse(body);
  }
}

request(eventOptions, eventCallback);

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

/* Request APIS after every hour. */
function hour() {
  var mins = new Date().getMinutes();
  if(mins == "00") {
      request(repoOptions, repoCallback);
      request(eventOptions, eventCallback);
      request(pullOptions, pullCallback);
   }
}
setInterval(hour, 1000);



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    repo: repos,
    event: events,
    pull: pulls,
    title: "Home"
  });
});

module.exports = router;
