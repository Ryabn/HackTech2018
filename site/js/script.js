var xhr = new XMLHttpRequest();
var url = "http://localhost:8080/";
var userPlaying = 0, clientId, xDir = 0, yDir = 0, calculatedAngle = 0, userShoot = 0;
var gameData = {};
var shipSet = [];

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
    var userData = {
        'id': clientId,
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
    xhr.open("GET", url + "?data=" + JSON.stringify(userData), true);
    xhr.send();
} 
function setupShips(){
    playerShip = new ship(39, 45, './images/user.png', xDir, yDir);
    for(let i = 0; i < gameData['totalPlayers']-1; i++){
        shipSet.push(new ship(39, 45, './images/user.png', gameData[i]['x'], gameData[i]['y']));
    }
}
function receivedSetupData(){
    gameField.start();
    setupShips();
}
function setupAnimation(){
    for(let i = 0; i < shipSet.length; i++){
        shipSet[i].x = gameData[i]['x'];
        shipSet[i].y = gameData[i]['y'];
    }
}
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    
    switch(keyName){
        case 'a':
            moveX = 1;
            break;
        case 'd':
            moveY = 1;
            break;
        default:
            console.log("not a or d");
            break;
    }
}, false);
