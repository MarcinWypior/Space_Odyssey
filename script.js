   var game=document.getElementById("game");
var keys=[];
    var ctx=game.getContext("2d");
    ctx.canvas.width=innerWidth;
    ctx.canvas.height=innerHeight;
    var Starship = new Image();
    Starship.src = "starship.png";
    var Star= new Image();
    Star.src = "Star.png";
    var xpos =innerWidth/2;
    var ypos =innerHeight/2;
    var angle =0;
    
setInterval(draw,7);
//window.addEventListener('keydown',shipMovement,false);
//window.addEventListener('keyup',stopShipMovement,false);
window.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
           keys[e.keyCode] = false;
        })

var dx=0;
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
  if (keys && keys[38]) {velocity = -2; }
  if (keys && keys[40]) {velocity = 2; }
    
    xpos=xpos-velocity*Math.sin(angle*Math.PI / 180);
    ypos=ypos+velocity*Math.cos(angle*Math.PI / 180);
    
    angle=angle+dangle;
 
    ctx.clearRect(0,0,game.width,game.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
        
    
    drawImageRot(Starship,xpos,ypos,40,60,angle);
    if((Collision(100,100,40,40)<10)){
        ctx.fillText("Kolizja", innerWidth/2, innerHeight/2);
    }
    
    ctx.fillText("x :"+Math.round(xpos)+" "+ " y: "+Math.round(ypos), 100, innerHeight-50);
    ctx.fillText("collistion "+Math.round(Collision(100,100,40,40)), 100, innerHeight-100);
    ctx.fillText("distance "+Math.round(Distance(xpos,ypos,40,40,100,100,40,40)), 100, innerHeight-150);
    
   drawImageRot(Star,100,100,40,40,starAngle);
    starAngle = starAngle +0.4;
    if(starAngle >360)
        starAngle=0;
    //ctx.drawImage(Star,100,100,40,40);
    
}

function drawImageRot(img,x,y,width,height,deg){
    // Store the current context state (i.e. rotation, translation etc..)
    //ctx.save();
    //Convert degrees to radian 
    var rad = deg * Math.PI / 180;
    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);
    //Rotate the canvas around the origin
    ctx.rotate(rad);
    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
      ctx.rotate(-rad);
    ctx.translate((x + width / 2)*(-1), (y + height / 2)*(-1));
    // Restore canvas state as saved from above
    //ctx.restore();
}

function Obstacle(px,py,pwidth,pheight){
 this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
}



function MyShip(px,py,pwidth,pheight,pangle)
{
this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
 this.angle=pangle;
}

function Collision(x,y,width,height)
{ 
   
    return Math.sqrt(x+width/2-(xpos-20)*(x+width/2-(xpos-20))+
                      (y+height/2-(ypos+20))*(y+height/2-(ypos+20)));
}

function Distance(x1,y1,width1,height1,x2,y2,width2,height2){
    
    return Math.sqrt(((x1-width1/2)-(x2-width2/2))*((x1-width1/2)-(x2-width2/2))
                    +((y1-height1/2)-(y2-height2/2))*((y1-height2/2)-(y2-height2/2)));
}


