var playerSprite = new Image();
var enemySprite  = new Image();
var laserSprite  = new Image();
playerSprite.src = './images/player1.svg';
enemySprite.src  = './images/enemy1.svg';
laserSprite.src  = './images/laser1.svg';

function pShip(width, height, x, y, angle, id){
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.id = id;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = gameField.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + 1.5);
        ctx.drawImage(playerSprite, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
}
function eShip(width, height, x, y, angle, id){
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.id = id;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = gameField.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + 1.5);
        ctx.drawImage(enemySprite, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
}
function laser(width, height, x, y, angle, id){
    this.id = id;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.x = 50 * Math.sin(angle) + x;
    this.y = 50 * Math.cos(angle) + y;
    this.update = function(){
        ctx = gameField.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + 1.5);
        ctx.drawImage(laserSprite, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
}