var gameField = {
    canvas : document.createElement("canvas"),
    start: function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateData, 150);
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
    shipSet.forEach(function(element){
        element.update();
        element.newPos();
        console.log(element.x, element.y);
    });
}