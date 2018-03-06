var boatImage = new Image();

function ship(width, height, imageSrc, x, y){
    //this.id = id;
    this.width = width;
    this.height = height;
    this.angle = 1.57;
    this.x = x;
    this.y = y;    
    this.update = function(){
        ctx = gameField.context;
        boatImage.src = imageSrc;
        ctx.drawImage(boatImage, this.x , this.y , this.width, this.height);
        //ctx.restore();
    }
    this.newPos = function(){
        this.x = xDir;
        this.y = yDir;
    }
}

//set clientId so that every boat object that is created is referenced by it