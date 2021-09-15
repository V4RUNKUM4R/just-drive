var track;
var track_Img;
var car;
var car_Img;
var right_bar;
var left_bar;
var obstacle1;
var obstacle2;
var obstacleG;
var treeImg;
var treeG;
var score;
var sprite;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg;
var restartImg;
var gameOver;
var restart;
var highScore;

function preload(){
  //pre-load images
  track_Img=loadImage("track.png");
  car_Img=loadImage("car.png");
  obstacle1=loadImage("hordle.png");
  obstacle2=loadImage("hurdle.png");
  treeImg=loadImage("tree.png");
  gameOverImg=loadImage("gameover.png");
  restartImg=loadImage("restartbutton.png");
}

function setup(){
  createCanvas(600,900);
  //create sprites here
  track=createSprite(200,400);
  track.addImage(track_Img);
  track.scale = 1.2;
  track.velocityY=4;

  car=createSprite(200,550,20,20);
  car.addImage(car_Img);
  car.scale = 0.1;

  sprite=createSprite(390,450,20,900);
  sprite.shapeColor="red";


  right_bar=createSprite(380,450,50,900);
  right_bar.visible=false;
  left_bar=createSprite(20,450,50,900);
  left_bar.visible=false;

  gameOver = createSprite(300,280);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,480);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.35;
  restart.scale = 0.35;

  obstacleG = new Group();
  treeG = new Group();

  score=0;
  highScore=0;
}

function draw() {
    background("green");

    if(gameState === PLAY){
      gameOver.visible = false;
     restart.visible = false;
     
     score=score+Math.round(frameCount/150);

     fill("yellow");
     stroke("blue");
     strokeWeight(2);
     textSize(20);
     text("Score: "+ score,410,100);
     text("HighScore: "+highScore,410,500);

     if(highScore<score){
       highScore=score;
     }

   if(track.y > 600){
    track.y=height/2;
  }

  car.collide(right_bar);
  car.collide(left_bar);

  spawnObstacle();
  spawntrees();
  carcontrols();

  if(obstacleG.isTouching(car)){
    gameState = END;
}
 }
else if (gameState === END) {
  
   gameOver.visible = true;
   restart.visible = true;
  
   track.velocityY = 0;
   track.visible = false;
   car.visible = false;
   sprite.visible = false;
  
   obstacleG.destroyEach();
   treeG.destroyEach();
  
   obstacleG.setVelocityXEach(0);
   treeG.setVelocityXEach(0);

   if(mousePressedOver(restart)) {
    reset();
  }
}

  

  drawSprites();
}



function spawnObstacle(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(0,0,10,40);
    obstacle.velocityY = 3;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               obstacle.scale = 5;
               break;
       case 2: obstacle.addImage(obstacle2);
               obstacle.scale = 0.03;
               break;
       default: break;
    }

    var place = Math.round(random(1,3));
    switch(place) {
      case 1: obstacle.x=100
              break;
      case 2: obstacle.x=200
              break;
      case 3: obstacle.x=300
              break;
      default: break;
   }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.04;
    obstacle.lifetime = 300;
    obstacleG.add(obstacle);
  }
}

function spawntrees() {
  //write code here to spawn the clouds
  if (frameCount % 65 === 0) {
     tree = createSprite(25,0,40,10);
    tree.addImage(treeImg);
    tree.scale = 0.4;
    tree.velocityY = 3;

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: tree.x=25;
              tree.y=0;
              break;
      case 2: tree.x=375;
              tree.y=0;
              break;
      default: break;
    }
    tree.lifetime = 300;
    treeG.add(tree);
  }
}

function carcontrols() {
  if(keyDown("right")){
    car.x=car.x+6;
  }

  if(keyDown("left")){
    car.x=car.x-6;
  }
}

function reset(){
  gameState = PLAY;
  car.visible = true;
  track.visible = true;
  sprite.visible = true;
  track.velocityY=4;
  score = 0;
}