//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage,knifeSound;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var monster,monsterImage,monsterGroup;
var gameover,gameoverImage,gameoverSound;

function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png");
  gameoverImage = loadImage("gameover.png");
  knifeSound = loadSound("knifeSwoosh.mp3");
  gameoverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  gameover = createSprite(300,300,20,20);
  gameover.addImage(gameoverImage);
  gameover.scale = 2;
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  
  //create fruit and monster Group variable here
  fruitGroup = new Group();
  monsterGroup = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    spawnFruits();
    spawnMonster();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    gameover.visible = false;
  
    // Increase score if knife touching fruit
   if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     score = score+2;
     knifeSound.play();
   }
    // Go to end state if knife touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState = END;
        gameoverSound.play();
        
      }
  } else
    if(gameState === END){
      gameover.visible = true;
      monsterGroup.destroyEach();
      knife.destroy();
      
    }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
function spawnFruits(){
  if(frameCount % 80 === 0){
    fruit = createSprite(600,200,20,20);
    fruit.scale = 0.2;
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: fruit.addImage(fruit1);
      break;
      case 2: fruit.addImage(fruit2);
      break;
      case 3: fruit.addImage(fruit3);
      break;
      case 4: fruit.addImage(fruit4);
      break;
      default:break;
    }
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100; 
    var position = Math.round(random(1,2))
    if(position == 1){
      fruit.x = 600;
    }
    fruitGroup.add(fruit);
  }

}
function spawnMonster(){
  if(frameCount % 200 === 0){
    monster = createSprite(600,200,20,20);
    monster.addImage(monsterImage);
    monster.y = Math.round(random(50,340));
    monster.velocityX = -7;
    monster.scale = 0.6;
    monster.setLifetime = 100;
    monsterGroup.add(monster);
  }
}