var xhr = new XMLHttpRequest();
var url = "http://localhost:8080/";
var userPlaying = 0;
var clientId;
var xDir = 0;
var yDir = 0;
var calculatedAngle = 0;
var userShoot = 0;
var gameData = {};

function getClientId(){
     xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                clientId = xhr.responseText;
                gameField.start();
            }
        }
    };
    xhr.open("GET", url + "?data=getid", true);
    xhr.send();
}

function retrieveServerData(){
    var userData = {
        'id': clientId,
        'inPlay': userPlaying,
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

function update(){
    retrieveServerData();
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
