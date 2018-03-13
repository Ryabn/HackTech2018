var xhr = new XMLHttpRequest();
//var url = "http://hacktech2018-196900.appspot.com/";
var url = "http://localhost:8080/";
var userPlaying = 0, clientId, xDir = 0, yDir = 0, calculatedAngle = 0, userShoot = false, mouseX = 0, mouseY = 0;
var gameData  = {},
    laserData = {};
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
                if(gameData['totalPlayers'] == -2){
                    clearInterval(gameField.interval);
                    alert(gameData['message']);
                }
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
            laserData[key] = true;
            if(clientId == key){
                allShips.push(new pShip(50, 50, parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }else{
                allShips.push(new eShip(50, 50, parseInt(gameData[key]['x']), parseInt(gameData[key]['y']), parseFloat(gameData[key]['angle']), key));
            }
        }
    }  
    userPlaying = gameData['totalPlayers'];
}
function shootLasers(key){
    allLasers.push(new laser(10, 70,
    gameData[key]['x'] + (60 * Math.sin(-gameData[key]['angle'] + 1.63)),
    gameData[key]['y'] + (60 * Math.cos(-gameData[key]['angle'] + 1.63)),
    parseFloat(gameData[key]['angle']), key));
    laserData[key] = false;
    setTimeout(function(){
        for(let i = 0; i < allLasers.length; i++){
            if(allLasers[i].id == key){
                allLasers.splice(i, 1);
            }
        }
        laserData[key] = true;
    }, 260);
}
function receivedSetupData(){
    setupShips();
    gameField.start();
}
function updateShips(){
    if(userPlaying != gameData['totalPlayers']){
        setupShips();
    }else{
        allShips.forEach(function(element, index){
            if(gameData.hasOwnProperty(element.id)){
                element.x = gameData[element.id]['x'];
                element.y = gameData[element.id]['y'];
                element.angle = gameData[element.id]['angle'];
                if(gameData[element.id]['shoot'] && laserData[element.id]){
                    shootLasers(element.id);
                }
            }else{
                allShips.splice(index, 1);
            }
        });
    }   
}
function setupAnimation(){
    updateShips();
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
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
        case 'r':
            userShoot = true;
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
        case 'r':
            userShoot = false;
            break;
        default:
            console.log("not wasd");
            break;
    }
}, false);