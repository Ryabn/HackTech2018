var xhr = new XMLHttpRequest();
//var url = "http://hacktech2018-196900.appspot.com/";
var url = "http://localhost:8080/";
var userPlaying = 0, clientId, xDir = 0, yDir = 0, calculatedAngle = 0, userShoot = 0, mouseX = 0, mouseY = 0;
var gameData = {};
var allShips = [], allLasers = [];
var moveX = 0, moveY = 0;

function getClientId(){
     xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                clientId = xhr.responseText;
                receivedSetupData();
            }
        }
    };
    xhr.open("GET", url + "?data=getid", true);
    xhr.send();
}
function retrieveServerData(){
    xDir += moveX;
    yDir += moveY;
    calculateAngle();
    var userData = {
        'x': xDir,
        'y': yDir,
        'angle': calculatedAngle,
        'shoot': userShoot
    };
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                gameData = JSON.parse(xhr.responseText);
                document.getElementById('display').innerHTML = JSON.stringify(gameData);
            }
        }
    };
    xhr.open("GET", url + "?data=" + JSON.stringify(userData) + "&id=" + clientId, true);
    xhr.send();
} 
function setupShips(){
    allShips = [];
    for (var key in gameData){
        if(key != 'totalPlayers'){
            if(clientId == key){
                allShips.push(new pShip(50, 50, parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }else{
                allShips.push(new eShip(50, 50, parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }
        }
    }  
    //userPlaying = gameData['totalPlayers'];
}
function setupLasers(){
    allLasers = [];
    for (var key in gameData){
        if(key != 'totalPlayers'){
            allLasers.push(new laser(10, 70, parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
        }
    }  
    userPlaying = gameData['totalPlayers'];
}
function receivedSetupData(){
    setupShips();
    setupLasers();
    gameField.start();
}

function updateLasers(){
    if(userPlaying != gameData['totalPlayers']){
        setupLasers();
    }else{
        allLasers.forEach(function(element){
            element.angle = gameData[element.id]['angle'];
            element.x = gameData[element.id]['x'] + (60 * Math.sin(-element.angle + 1.63));
            element.y = gameData[element.id]['y'] + (60 * Math.cos(-element.angle + 1.63));
        });
    }   
    console.log(allLasers);
}

function updateShips(){
    if(userPlaying != gameData['totalPlayers']){
        setupShips();
        console.log("its repeating!!!!");
    }else{
        allShips.forEach(function(element){
            element.x = gameData[element.id]['x'];
            element.y = gameData[element.id]['y'];
            element.angle = gameData[element.id]['angle'];
        });
    }   
}
function setupAnimation(){
    updateShips();
    updateLasers();
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key
    switch(keyName){
        case 'w':
            moveY = -2;
            break;
        case 's':
            moveY = 2;
            break;
        case 'a':
            moveX = -2;
            break;
        case 'd':
            moveX = 2;
            break;
        default:
            console.log("not wasd");
            break;
    }
}, false);
document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    switch(keyName){
        case 'w':
            moveY = 0;
            break;
        case 's':
            moveY = 0;
            break;
        case 'a':
            moveX = 0;
            break;
        case 'd':
            moveX = 0;
            break;
        default:
            console.log("not wasd");
            break;
    }
}, false);