var xhr = new XMLHttpRequest();
var url = "http://hacktech2018-196900.appspot.com/";
var userPlaying = 0, clientId, xDir = 0, yDir = 0, calculatedAngle = 0, userShoot = 0;
var gameData = {};
var allShips = [];
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
    for(let i = 0; i < gameData['totalPlayers']; i++){
        /*
        console.log("not being run");
        if(i == clientId){
            allShips.push(new ship(50, 50, './images/player.svg', xDir, yDir));
        }else{
            allShips.push(new ship(50, 50, './images/enemy.svg', parseInt(gameData[i]['x']), parseInt(gameData[i]['y'])));
        }
        */
        console.log(parseInt(gameData[i]['x']), parseInt(gameData[i]['y']));
        allShips.push(new ship(50, 50, './images/player.svg', parseInt(gameData[i]['x']), parseInt(gameData[i]['y'])));
    }
}
function receivedSetupData(){
    setupShips();
    gameField.start();
}
function setupAnimation(){
    allShips = [];
    setupShips();
    /*
    if(gameData['totalPlayers'] >= allShips.length()){
        setupShips();
    }
    for(let i = 0; i < shipSet.length; i++){
        allShips[i].x = gameData[i]['x'];
        allShips[i].y = gameData[i]['y'];
    }
    */
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