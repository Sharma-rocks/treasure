var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var treasureCollection = 0;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;

var cashG,diamondsG,jwelleryG,swordGroup;

var gameOver
var treasure
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  
  endImg =loadAnimation("gameOver.png");
}

function setup(){  
createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
//creating gameOverImg  
gameOver = createSprite(width/2,200);
gameOver.addAnimation("gameOver",endImg);
gameOver.scale=0.5;
  
//creating cash,diamonds,jwellery and sword groups
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

treasure=0

function draw() {

  background(0); 
  
  console.log("this is ",gameState)
  
if(gameState===PLAY){
  
  //making gameOver invisible
  gameOver.visible=false;
  
  //move the path  
  path.velocityY = 4; 
  
  //giving isTouching condition and scoring system for all treasures    
  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection = treasureCollection + 10;
  }
    else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection + 10;

    }else if(jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection = treasureCollection + 10;

    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
      }
  }

  //code to reset the background
  if(path.y > height){
    path.y = height/2;
  }

  //positioning boy with mouse  
  boy.x = World.mouseX;

  //creating or spawning treasures
  createCash();
  createDiamonds();
  createJwellery();
  createSword();

  //gameOver when boy touches the swordGroup
  if(swordGroup.isTouching(boy)){
    gameState = END;
     }    
}
else if (gameState===END){
  //making gameOver visible
  gameOver.visible=true;
  path.velocityY = 0;
  boy.velocityY = 0;
  boy.addAnimation("SahilRunning",endImg);
  cashG.destroyEach();
  cashG.setVelocityYEach(0);
  diamondsG.destroyEach();
  diamondsG.setVelocityYEach(0);
  jwelleryG.destroyEach();
  jwelleryG.setVelocityYEach(0);
  swordGroup.destroyEach();
  swordGroup.setVelocityYEach(0);
 }
 
  
  edges= createEdgeSprites();
  boy.collide(edges);

  drawSprites();

  //making scoring system  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  //write code here to spawn cash
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;    
  //assign lifetime to the variable
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  //write code here to spawn diamonds
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  //assign lifetime to the variable
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
 }
}

function createJwellery() {
  //write code here to spawn jwellery
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  //assign lifetime to the variable
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  //write code here to spawn sword
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  //assign lifetime to the variable
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}