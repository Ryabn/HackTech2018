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
        checkCollision(playerData['x'], playerData['y'], playerData['angle']);
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
    //laserx = x + (60 * Math.sin(-angle + 1.63));
    //lasery = y + (60 * Math.cos(-angle + 1.63));
    //-tan of angle is slope of the line
    // b = y - (tan(angle) * x)
    // m = tan(angle)
    angle = -angle + 0.075;
    //point 1:
    var x1 = x + 20 * Math.sin(angle);
    var y1 = y + 20 * Math.cos(angle);
    //point 2:
    var x2 = x + x - x1;
    var y2 = y + y - y1;
    //point 3:
    var x3 = x1 + 110 * Math.sin(angle + 1.5708);
    var y3 = y1 + 110 * Math.cos(angle + 1.5708);
    //point 4:
    var x4 = x3 + (x2 - x1);
    var y4 = y3 + (y2 - y1);
    
    gameData['collisionbox'] = {
        'p1': [x1, y1],
        'p2': [x2, y2],
        'p3': [x3, y3],
        'p4': [x4, y4]
    };
    
    var xSorted = {
    }
    var ySort = [y1, y2, y3, y4];
    var xSort = [x1, x2, x3, x4];
    
    for(i = 0; i < 4; i++){
        xSorted[ySort[i]] = xSort[i];
    }
    ySort.sort();

    for(var key in gameData){
        var pX = gameData[key]['x'];
        var pY = gameData[key]['y'];
        if((pY <= ySort[0]) && (pY >= ySort[3])){
            if(pY <= ySort[1]){
                //between 0 and 1
            }else if(pY <= ySort[2]){
                //between 1 and 2
                
            }else{
                //between 2 and 3
            }
        }
        
    }
}


const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});