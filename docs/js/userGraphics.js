var gameField = {
    canvas : document.createElement("canvas"),
    start: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateData, 30);
        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function spawn(){
    xDir = Math.floor(Math.random()*400);
    yDir = Math.floor(Math.random()*400);
}

function updateData(){
    retrieveServerData();
    setupAnimation();
    
    gameField.clear();
    
    //drawCollisionBox();
    allShips.forEach(function(element){
        element.update();
    });
    allLasers.forEach(function(element){
        element.update();
    });
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
gameField.canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(gameField.canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
}, false);

function calculateAngle(){
    calculatedAngle = Math.atan2((mouseY - yDir),(mouseX - xDir));
}

function drawCollisionBox(){
    if(gameData.hasOwnProperty('collisionbox')){
        var c = gameField.canvas;
        var ctx = c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(gameData['collisionbox']['p1'][0],gameData['collisionbox']['p1'][1]);
        ctx.lineTo(gameData['collisionbox']['p2'][0], gameData['collisionbox']['p2'][1]);
        ctx.lineTo(gameData['collisionbox']['p4'][0], gameData['collisionbox']['p4'][1]);
        ctx.lineTo(gameData['collisionbox']['p3'][0], gameData['collisionbox']['p3'][1]);
        ctx.lineTo(gameData['collisionbox']['p1'][0], gameData['collisionbox']['p1'][1]);
        ctx.stroke(); 
    }
}