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


function draw(){    
    
    dx=0;
    dy=0;
    dangle=0;
    velocity=0;
    
  if (keys && keys[37]) {
      //dx= -1
      dangle = -0.4; }
  if (keys && keys[39]) {
      //dx=1;
      dangle = 0.4;  
  }
  if (keys && keys[38]) {velocity = -2; }
  if (keys && keys[40]) {velocity = 2; }
    
    xpos=xpos-velocity*Math.sin(angle*Math.PI / 180);
    ypos=ypos+velocity*Math.cos(angle*Math.PI / 180);
    
    angle=angle+dangle;
 
    //ctx.save();
    ctx.clearRect(0,0,game.width,game.height);
    //ctx.translate(xpos-20,ypos-30);
    //ctx.rotate(angle);
    //ctx.drawImage(Starship,xpos-20,ypos-30,40,60);
    drawImageRot(Starship,xpos,ypos,40,60,angle);
    //ctx.rotate(-angle);
   // ctx.translate(-xpos+20,-ypos+30);
    //ctx.restore();
   
    ctx.drawImage(Star,100,100,40,40);
    
}

function drawImageRot(img,x,y,width,height,deg){
    // Store the current context state (i.e. rotation, translation etc..)
    //ctx.save()

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


