var boatImage = new Image();

function ship(width, height, imageSrc, x, y, angle, id){
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.id = id;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = gameField.context;
        boatImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + 1.5);
        ctx.drawImage(boatImage, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
}
function laser(width, height, imageSrc, x, y, angle){
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = gameField.context;
        boatImage.src = imageSrc;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + 1.5);
        ctx.drawImage(boatImage, -this.width/2 ,-this.height/2 , this.width, this.height);
        ctx.restore();
    }
}