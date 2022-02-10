//WARNING: MESSY CODE

var fetch = require('node-fetch');

var crypto = require('crypto-random-string');

goodNames = [];

setInterval(function() {
  var str = crypto({ length: 3, characters : 'abcdefghijklmnopqrstuvwxyz1234567890_-'});

  if (goodNames.includes(str)) {return;}

  fetch('https://api.scratch.mit.edu/accounts/checkusername/' + str)
    .then(res => res.json())
    .then(json => {
      if (json.msg == "valid username") {
        console.log(json)
        console.log(goodNames.length+1);
        goodNames.push(json.username);
      }
    }
    );
}, 0);

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function getUsername() {
  return randomItem(goodNames);
}

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

app.get('/api/name', function (req, res) {
  res.send(getUsername());
})
 
app.listen(3000);