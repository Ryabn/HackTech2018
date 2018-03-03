
const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function playerConnect(){
    addPlayer();
}

function addPlayer(){
    var playerNum = gameData['totalPlayers'] + 1;
    gameData['totalPlayers'] = playerNum;
    gameData['player' + playerNum] = {
        'x': 0,
        'y': 0,
        'angle': 0
    }
}

var gameData = {
    "totalPlayers": 0  
};

function updatePositions(){
    app.get('/', (req, res) => res.send(gameData));
}

var updateValues = setInterval(updatePositions, 100);


const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});

