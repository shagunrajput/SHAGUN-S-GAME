var Shagun;
var bg;
var ground;

var treebranch,puddle,mountain;
var snowmonster;
var snowflakes;
var healthbar,candyImg;
var bullet;
var castle,castleImg;
var shagunImg;
var shagunImg2;
var  gameState="play";
var score=0;
var life=4;
var obstacleGroup;
var energybarGroup;

var count=0;


var i=0,j=0;

function preload(){
snowmonster=loadImage("snowMonster2.png");
treebranch=loadImage("hurdl2.png");
bg=loadImage("snowImg2.jpg");
candyImg=loadImage("candy.gif");
castleImg=loadImage("castle.png");
shagunImg=loadAnimation("frames/0.png","frames/1.png","frames/2.png","frames/3.png","frames/4.png","frames/5.png");
shagunImg2=loadImage("frames/1.png");
}

function setup()
{

  createCanvas(1000,600);
  
  
  ground=createSprite(600,600,1600,10);
  bkground=createSprite(700,300,2800,600);
  Shagun=createSprite(70,530,55,95);
    Shagun.addAnimation("running",shagunImg);
  bkground.addImage(bg);
  console.log(bkground.x) ;
  obstacleGroup= new Group ();
  energybarGroup= new Group ();
}

function draw()
{
  background("skyblue");
  if(gameState==="play")
  {
          bkground.velocityX=-3;

          if(bkground.x<=50 )   
          {
            console.log(bkground.x)
              bkground.x=bkground.width/2;

          }
          if (frameCount % 300 === 0)
          {
          spawnObstacles();
        }

        if (frameCount % 700 === 0)
          {
          spawnenergybar();
        }

        if(frameCount%2000===0 && count===0){
          castle=createSprite(1100,375,100,100);
          castle.addImage(castleImg);
          castle.velocityX=-3;
          castle.scale=0.3;
          count=1;
        //castle.debug=true;
        castle.setCollider("rectangle",0,0,500,1000);
        Shagun.depth=castle.depth+1;

        }

          if (keyDown("SPACE") && Shagun.y>350){
            Shagun.velocityY=-11;
            
          }
          Shagun.velocityY=Shagun.velocityY+0.5;

          if(Shagun.isTouching(obstacleGroup)){
          life=life-1;
            obstacleGroup.get(i).destroy();

          }

          if(Shagun.isTouching(energybarGroup)){
            life=life+1;
            energybarGroup.get(j).destroy();
          }

          if (count===1 && Shagun.isTouching(castle)  ){
            gameState="won";
            castle.velocityX=0;
          }

          if (life===0){
            gameState="End";
          }

          
  }

  if(gameState==="End" || gameState==="won"){
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bkground.velocityX=0;
    energybarGroup.setVelocityXEach(0);
    energybarGroup.setLifetimeEach(-1);
    
    Shagun.addImage("running",shagunImg2);
  }

        Shagun.collide(ground);
          drawSprites();

    fill ("yellow");
    textSize(50);
     text ("LIVES: " + life,800,50);
     if(gameState==="End"){
      text("YOU-LOST",500,300);
     }
      if (gameState==="won"){
      text("WON",500,300);
      textSize(50);
     }
    
}

function spawnObstacles()
{
  
    var obstacle = createSprite(1050,530,10,40);
    obstacle.velocityX = -3;
    obstacle.lifetime=550;
    
     //generate random obstacles
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacle.addImage(snowmonster);
                obstacle.scale=0.3;
               break;
       case 2: obstacle.addImage(treebranch);
                obstacle.scale=0.2;
                obstacle.y=570;
               break;
       
      default: break;
     }

     obstacleGroup.add(obstacle);
  
}

function spawnenergybar(){
  var energybar = createSprite(1100,530,10,40);
    energybar.velocityX = -3;
    energybar.lifetime=550;
    energybarGroup.add(energybar);
    energybar.addImage(candyImg);
    energybar.scale=0.1;
    
}