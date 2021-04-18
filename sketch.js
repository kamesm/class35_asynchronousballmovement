var ball1;
var database, position;

function setup(){
    database = firebase.database()
    createCanvas(500,500);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    var ballPosition = database.ref("ball/position")
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();

}

function changePosition(x,y){
    database.ref("ball/position").set({
        'x': position.x + x, 
        'y': position.y + y
    })
}

function readPosition(data){
    position = data.val();
    ball1.x = position.x
    ball1.y = position.y
}
function showError(){
    console.log("error has occured.")
}