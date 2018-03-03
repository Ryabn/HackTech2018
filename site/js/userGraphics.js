function startGame(){
    getClientId();
    //setUserStats();
    //playerBoat = new userBoat(window.innerHeight/5, window.innerHeight/10, boatImageDat, window.innerWidth/2, window.innerHeight*0.7);
    //userControls();
    //displayHealth();
    //generateEnemies();
}

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
    yDir = Math.floor(Math.random()*400);;
}

function updateData(){
    //updates data
    //battlefield.clear();
    //updates graphics
    update();
}