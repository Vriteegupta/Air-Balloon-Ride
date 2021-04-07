var balloon1,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon1=createSprite(250,450,150,150);
  balloon1.addAnimation("hotAirBalloon",balloonImage1);
  balloon1.scale=0.5;
  var balloon1Pos = database.ref('balloon/position');
  balloon1Pos.on("value",readPositon,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(+5,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,-5);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(0,+5);
  }

  
  drawSprites();
}
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y) {
  database.ref("balloon/position").set({'x':position.x+x,'y':position.y+y});
}

function readPositon(data) {
  position = data.val();

  balloon1.x = position.x;
  balloon1.y = position.y;
}

function showError() {
  console.log("Error in the database");
}
