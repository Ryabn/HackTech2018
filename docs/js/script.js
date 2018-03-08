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
                allShips.push(new ship(50, 50, './images/player1.svg', parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }else{
                allShips.push(new ship(50, 50, './images/enemy1.svg', parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }
        }
    }  
    userPlaying = gameData['totalPlayers'];
}
function receivedSetupData(){
    
    allLasers.push(new laser(10, 75, './images/laser1.svg', 0, 0, 0));
    allLasers.push(new laser(10, 75, './images/laser1.svg', 0, 0, 0));
    setupShips();
    gameField.start();
}

function shootLaser(x, y, angle){
     allLasers.forEach(function(element){
            element.x = gameData[element.id]['x'];
            element.y = gameData[element.id]['y'];
            element.angle = gameData[element.id]['angle'];
        });
    console.log(allLasers);
}

function setupAnimation(){
    shootLaser(gameData[0]['x'],gameData[0]['y'],gameData[0]['angle']);
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