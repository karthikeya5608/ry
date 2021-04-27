var player,playeridle,playerrun,playerjump,playerhealth=10,playerdeath;
var imagestate2="left",deathstate="true";
var enemy,enemyimage;
var retry,ground;

function preload(){
    bg=loadImage("background.png")
    playeridle=loadAnimation("player/movement/adventurer-idle-00.png","player/movement/adventurer-idle-01.png",
    "player/movement/adventurer-idle-02.png","player/movement/adventurer-idle-03.png");
    playerrun=loadAnimation("player/movement/adventurer-run-00.png","player/movement/adventurer-run-01.png","player/movement/adventurer-run-02.png","player/movement/adventurer-run-03.png","player/movement/adventurer-run-04.png","player/movement/adventurer-run-05.png")
    playerjump=loadAnimation("player/movement/adventurer-jump-00.png","player/movement/adventurer-jump-01.png","player/movement/adventurer-jump-02.png","player/movement/adventurer-jump-03.png","player/movement/adventurer-fall-00.png","player/movement/adventurer-fall-01.png")
    playerdeath=loadAnimation("player/movement/adventurer-die-00.png","player/movement/adventurer-die-01.png","player/movement/adventurer-die-02.png","player/movement/adventurer-die-03.png","player/movement/adventurer-die-04.png","player/movement/adventurer-die-05.png","player/movement/adventurer-die-06.png");
    playerhurt=loadAnimation("player/movement/adventurer-hurt-00.png")
    // enemyimage =loadImage("druid/ezgif.com-gif-maker.gif");
  // enemy = createImg("druid/ezgif.com-gif-maker.gif");
}

function setup(){
    createCanvas(1365,653);
    ground=createSprite(337.5,355,880,20);
    ground.visible=true;
   //ground.setCollider("rectangle",0,0,895,20);
    player=createSprite(700,200,10,10);
    player.setCollider("rectangle",0,0,15,35);
    player.addAnimation("idle",playeridle);
    player.scale=2.35;
   // player.velocityY=4;
   enemy=createSprite(700,337,50,50);
   
   retry=createSprite(700,200);

}

function draw(){
    background(bg);
   if(keyDown("space")&&player.isTouching(ground))
   {
       player.velocityY=-10;
   }
   else
   {
    player.collide(ground);
    player.velocityY=player.velocityY+0.8;
   }

   if(player.x>enemy.x){
     enemy.velocityX=2;
   }
   else if(player.x<enemy.x){
     enemy.velocityX=-2;
   }
   if(enemy.isTouching(player)){
     enemy.x=enemy.x+50;
     if(playerhealth!==0){
     playerhealth=playerhealth-1; 
   }
   }
   if(playerhealth===0&&deathstate==="true"){
     deathstate="false";
     player.addAnimation("idle",playerdeath);
   }
   
   if(player.y>enemy.y){
    enemy.velocityY=1.1;
  }
  else if(player.y<enemy.y){
    enemy.velocityY=-1.1;
  }

   playerright();
   playerleft();
   
   player.debug=true;
   ground.debug=true;

   drawSprites();
   fill("white")
   text("health="+playerhealth,1000,600)

    //sprite.mirrorX(sprite.mirrorX() * -1);
    //8448799005
}

function playerright() {
  /*  if (keyDown(RIGHT_ARROW)) 
    {
     player.x=player.x+4;
    } */
 
    if (keyWentDown(RIGHT_ARROW)&&imagestate2==="right") 
    {
     player.mirrorX(player.mirrorX() * -1);
        imagestate2="left";
    }
     if(keyWentDown(RIGHT_ARROW))
    {
        player.velocityX=4;
     player.addAnimation("idle",playerrun);
    }
     if(keyWentUp(RIGHT_ARROW))
    {
        player.velocityX=0;
     player.addAnimation("idle",playeridle)
  /*   if(keyDown(LEFT_ARROW)){
         player.addAnimation("idle",playerrun);
        }*/
    }
    
    if(keyWentUp(RIGHT_ARROW)&&keyDown(LEFT_ARROW))
    {
        player.velocityX=-4;
      player.addAnimation("idle",playerrun);
      if(imagestate2==="left"){
      player.mirrorX(player.mirrorX() * -1);
      imagestate2="right";
      }
    }

}

function playerleft() {
 /*   if (keyDown(LEFT_ARROW)) 
    {
       player.x=player.x-4;
    }*/
 
    if (keyWentDown(LEFT_ARROW)&&imagestate2==="left") 
    {
            player.mirrorX(player.mirrorX() * -1);
            imagestate2="right"
     }
      if(keyWentDown(LEFT_ARROW)){
        player.velocityX=-4;
      player.addAnimation("idle",playerrun);
     }
      if (keyWentUp(LEFT_ARROW)) {
         player.velocityX=0;
           player.addAnimation("idle",playeridle);
 /*     if(keyDown(RIGHT_ARROW))
    {
     player.addAnimation("idle",playerrun);
    }*/
     }
     
    if(keyWentUp(LEFT_ARROW)&&keyDown(RIGHT_ARROW))
    {
        player.velocityX=4;
      player.addAnimation("idle",playerrun);
      if(imagestate2==="right"){
      player.mirrorX(player.mirrorX() * -1);
      imagestate2="left";
      }
    }
}