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

function generateDeathInfo(){
    var data = {
        'totalPlayers': -2,
        'message': 'You were destroyed'
    };
    return data;
}

function analyzePositions(playerData, clientId){
    playerData = JSON.parse(playerData);
    gameData[clientId]['x'] = playerData['x'];
    gameData[clientId]['y'] = playerData['y'];
    gameData[clientId]['angle'] = playerData['angle'];
    if(canShootGameData[clientId] && playerData['shoot']){
        gameData[clientId]['shoot'] = true;
        canShootGameData[clientId] = false;
        checkCollision(clientId, playerData['x'], playerData['y'], playerData['angle']);
        setTimeout(function(){
            if(gameData.hasOwnProperty(clientId)){
                gameData[clientId]['shoot'] = false;
            }
            setTimeout(function(){
                if(gameData.hasOwnProperty(clientId)){
                    canShootGameData[clientId] = true;
                }
            }, 1250);
        },250);
    }
}
function extractUserData(res, id){
    if(id['data'] == "getid"){
        playerConnect();
        res.send(playerId.toString());
        playerId++;
    }else{
        if(gameData.hasOwnProperty(id['id'])){
            analyzePositions(id['data'], id['id']);
            console.log(gameData);
            res.send(gameData);
        }else{
            res.send(generateDeathInfo());
        }   
    }
}

function checkCollision(clientId, x, y, angle){
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
    
    var ySort = [y1, y2, y3, y4];
    var xSort = [x1, x2, x3, x4];
    var xSorted = {};
    for(i = 0; i < 4; i++){
        xSorted[ySort[i]] = xSort[i];
    }
    //sort ySort using insertion sort
    //sorts from least to greatest
    for(var i = 0; i < ySort.length; i++){
        for(var j = i + 1; j >= 1; j--){
            if(ySort[j] < ySort[j-1]){
                var temp = ySort[i];
                ySort[i] = ySort[j];
                ySort[j] = temp;
            }
        }
    }
    
    xSorted = getSlopes(ySort, xSorted);
    
    for(var key in gameData){
        if(clientId != key ){
            var pX = gameData[key]['x'];
            var pY = gameData[key]['y'];
            if((pY >= ySort[0]) && (pY <= ySort[3])){
                if(pY <= ySort[1]){
                    //between 0 and 1
                    var uSlope = calculateSlopes(pY, pX, ySort[0], xSorted[ySort[0]]);
                    if(uSlope <= xSorted['slopes'][0] || uSlope >= xSorted['slopes'][1]){
                        destroyShip(key);
                    }
                }else if(pY <= ySort[2]){
                    //between 1 and 2
                    var uSlope = calculateSlopes(pY, pX, ySort[1], xSorted[ySort[1]]);
                    var uSlope2 = calculateSlopes(pY, pX, ySort[2], xSorted[ySort[2]]);
                    if(uSlope <= xSorted['slopes'][5] && uSlope2 >= xSorted['slopes'][5]){
                        destroyShip(key);
                    }
                }else{
                    //between 2 and 3
                    var uSlope = calculateSlopes(pY, pX, ySort[3], xSorted[ySort[3]]);
                    if(uSlope <= xSorted['slopes'][3] || uSlope >= xSorted['slopes'][2]){
                        destroyShip(key);
                    }
                }   
            }
        }
    }
}

function calculateSlopes(p1y, p1x, p2y, p2x){
    return (p2y - p1y)/(p2x - p1x);
}
function getSlopes(ySort, xSorted){
    xSorted['slopes'] = [ 
        calculateSlopes(ySort[0], xSorted[ySort[0]], ySort[1], xSorted[ySort[1]]),
        calculateSlopes(ySort[0], xSorted[ySort[0]], ySort[2], xSorted[ySort[2]]),
        calculateSlopes(ySort[3], xSorted[ySort[3]], ySort[1], xSorted[ySort[1]]),
        calculateSlopes(ySort[3], xSorted[ySort[3]], ySort[2], xSorted[ySort[2]]),
    ];
    xSorted['slopes'].push(xSorted['slopes'][1]);
    xSorted['slopes'].push(xSorted['slopes'][2]);
    if(xSorted['slopes'][0] < xSorted['slopes'][1]){
        var temp = xSorted['slopes'][0];
        xSorted['slopes'][0] = xSorted['slopes'][1];
        xSorted['slopes'][1] = temp;
    }
    if(xSorted['slopes'][2] > xSorted['slopes'][3]){
        var temp = xSorted['slopes'][2];
        xSorted['slopes'][2] = xSorted['slopes'][3];
        xSorted['slopes'][3] = temp;
    }
    console.log(xSorted);
    return xSorted;
}

const server = app.listen(8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Example app listening at http://${host}:${port}`);
});