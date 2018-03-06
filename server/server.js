const express = require('express');
const app = express();

var playerId = 0;
var gameData = {
    "totalPlayers": 0  
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function playerConnect(){
    var playerNum = gameData['totalPlayers'] + 1;
    gameData['totalPlayers'] = playerNum;
    gameData[playerId] = {
        'x': -10,
        'y': -10,
        'angle': 0
    }
}


app.get('/', function(req, res){
    var id = req.query;
    extractUserData(res, id);
});

function analyzePositions(playerData, clientId){
    playerData = JSON.parse(playerData);
    gameData[clientId]['x'] = playerData['x'];
    gameData[clientId]['y'] = playerData['y'];
    gameData[clientId]['angle'] = playerData['angle'];
}

function extractUserData(res, id){
    //console.log(id['data']);
    if(id['data'] == "getid"){
        playerConnect();
        res.send(playerId.toString());
        playerId++;
    }else{
        analyzePositions(id['data'], id['id']);
        console.log(gameData);
        res.send(gameData);
    }
}

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});