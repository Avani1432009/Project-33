const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope1,rope2;
var watermelon;
var watermelonLink;
var backgroundImg,watermelonImg,rabbitImg;
var bunny;
var button1,button2;
var blink,eat,sad;
var bubbleImg,bubble;

function preload(){
backgroundImg = loadImage("background.png");
watermelonImg = loadImage("melon.png");
rabbitImg = loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
bubbbleImg = loadImage("bubble.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
blink.playing = true;
eat.playing = true;
eat.looping = false;
sad.looping = false;
sad.playing = true;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(300,200,100,10);
  rope1 = new Rope(6,{x:50,y:400});
  rope2 = new Rope(6,{x:230,y:300});

  var fruit_options = {
    density:0.001
  }
  watermelon = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope1.body,watermelon);

  watermelon = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope2.body,watermelon);

  watermelonLink_con = new Link(rope1,watermelon);
  watermelonLink_con2 = new Link(rope2,watermelon);

  bunny = createSprite(300,130,100,100);
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny.addAnimation("blinking",blink);
  bunny.scale = 0.2;
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);


  button1 = createImg('cut_btn.png');
  button1.position(30,400);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(200,300);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  bubble = createSprite(300,400,50,50);
  bubble.addImage("bubbleImg",bubbleImg);
  bubble.scale = 0.05;

  rectMode(CENTER);
  imageMode (CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
  
}

function draw() 
{
   background(51);
   image(backgroundImg,width/2,height/2,500,700)
   ground.show();
   rope1.show();
   rope2.show();
   if(watermelon != null){
     image(watermelonImg,watermelon.position.x,watermelon.position.y,60,60)
}
    
    if(collide(watermelon,bunny) == true){
      bunny.changeAnimation("eating");
    } 


    //d = dist(watermelon.position.x,watermelon.position.y,bunny.x,bunny.y);
   // console.log(d);

   Engine.update(engine);
  

   drawSprites();
   
}
function drop1(){
   rope1.break();
   watermelonLink_con.detach();
   watermelonLink_con = null;
}

function drop2(){
  rope2.break();
  watermelonLink_con2.detach();
  watermelonLink_con2 = null;
}

function collide(body,sprite){
   if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
   if(d <= 80){
     bubble.visible = false
     World.remove(engine.world,watermelon);
     watermelon = null;
     return true;
    }   
    else {
      return false;
    }
  }
}