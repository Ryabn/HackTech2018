const express = require('express');
const app = express();


var canShootGameData = {
    
};
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
        'x': -100,
        'y': -100,
        'angle': 0,
        'shoot': false
    }
    canShootGameData[playerId] = true;
}

app.get('/', function(req, res){
    var id = req.query;
    extractUserData(res, id);
});

//if destroyed then call this
function destroyShip(clientIdNum){
    delete gameData[clientIdNum];
}

function analyzePositions(playerData, clientId){
    playerData = JSON.parse(playerData);
    gameData[clientId]['x'] = playerData['x'];
    gameData[clientId]['y'] = playerData['y'];
    gameData[clientId]['angle'] = playerData['angle'];
    if(canShootGameData[clientId] && playerData['shoot']){
        gameData[clientId]['shoot'] = true;
        canShootGameData[clientId] = false;
        checkCollision(playerData['x'],playerData['y'],playerData['angle'];);
        setTimeout(function(){
            gameData[clientId]['shoot'] = false;
            setTimeout(function(){
                canShootGameData[clientId] = true;
            }, 1250)
        },250);
    }
}
function extractUserData(res, id){
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

function checkCollision(x, y, angle){
    for(var key in gameData){
        
    }
}


const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});