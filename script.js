   var game=document.getElementById("game");
var keys=[];
    var ctx=game.getContext("2d");
    ctx.canvas.width=innerWidth;
    ctx.canvas.height=innerHeight;
    var Starship = new Image();
    Starship.src = "starship.png";
    var Star= new Image();
    Star.src = "Star.png";
    var exhaust= new Image();
    exhaust.src="exhaust.png";
    
    myShip= new Ship(innerWidth/2,innerHeight/2,40,60,0);

    var xpos =innerWidth/2;
    var ypos =innerHeight/2;

    var angle =0;

    obstacle= new Obstacle(100,100,40,40);
    

setInterval(draw,7);
//window.addEventListener('keydown',shipMovement,false);
//window.addEventListener('keyup',stopShipMovement,false);
window.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
           keys[e.keyCode] = false;
        })

var dx=0;  //test
var dy=0;
var velocity=0;
var dangle=0;

var starAngle=0;

function draw(){    
    
    dx=0;
    dy=0;
    dangle=0;
    velocity=0;
    
  if (keys && keys[37]) {
      //dx= -1
      dangle = -0.7; }
  if (keys && keys[39]) {
      //dx=1;
      dangle = 0.7;  
  }
  if (keys && keys[38]) {velocity = -1.4; }
  if (keys && keys[40]) {velocity = 1.4; }
    
    myShip.x=myShip.x-velocity*Math.sin(myShip.angle*Math.PI / 180);
    myShip.y=myShip.y+velocity*Math.cos(myShip.angle*Math.PI / 180);
    
    myShip.angle=myShip.angle+dangle;
 
    ctx.clearRect(0,0,game.width,game.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
        
    
    drawImageRot(Starship,myShip.x,myShip.y,myShip.width,myShip.height,myShip.angle);
    if((Collision(100,100,40,40)<10)){
        ctx.fillText("Kolizja", innerWidth/2, innerHeight/2);
    }
    
    
    ctx.fillText("x :"+Math.round(myShip.x)+" "+ " y: "+Math.round(myShip.y), 100, innerHeight-50); //położenie statku
    ctx.fillText("collistion "+Math.round(Collision(100,100,40,40)), 100, innerHeight-100);//
    ctx.fillText("distance "+Math.round(Distance(myShip,obstacle)), 100, innerHeight-150);
    ctx.fillText("x difference "+ Math.round((myShip.x+myShip.width/2- obstacle.x-obstacle.width/2)), 150, 30);
    ctx.fillText("y difference "+ Math.round(myShip.y+myShip.height/2- obstacle.y-obstacle.height/2), 150, 80);

    
   drawImageRot(Star,obstacle.x,obstacle.y,obstacle.width,obstacle.height,starAngle);
    starAngle = starAngle +0.4;
    if(starAngle >360)
        starAngle=0;
    
    drawImageRot(exhaust,myShip.x+(myShip.width+4)*Math.sin(-myShip.angle*Math.PI / 180),myShip.y+(myShip.width+4)*Math.cos(myShip.angle*Math.PI / 180),40,60,myShip.angle+90);
    
}

function drawImageRot(img,x,y,width,height,deg){
    var rad = deg * Math.PI / 180;
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rad);  
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    ctx.rotate(-rad);
    ctx.translate((x + width / 2)*(-1), (y + height / 2)*(-1));
}

function Obstacle(px,py,pwidth,pheight){
 this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
}



function Ship(px,py,pwidth,pheight,pangle)
{
 this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
 this.angle=pangle;
}

function Collision(x,y,width,height)
{
   
    return Math.sqrt((x+width/2-(xpos-20))*(x+width/2-(xpos-20))+
                      (y+height/2-(ypos+20))*(y+height/2-(ypos+20)));
}

function Distance(a,b)
{    
    return Math.sqrt(((b.x+b.width/2)-(a.x+a.width/2))*((b.x+b.width/2)-(a.x+a.width/2))
                    +((b.y+b.height/2)-(a.y+a.height/2))*((b.y+b.height/2)-(a.y+a.height/2)));
}


