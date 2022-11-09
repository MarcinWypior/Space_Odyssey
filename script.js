   var game=document.getElementById("game");
var keys=[];
    var ctx=game.getContext("2d");
    ctx.canvas.width=innerWidth;
    ctx.canvas.height=innerHeight;
    var Starship = new Image();
    Starship.src = "starship.png";
    var Star= new Image();
    Star.src = "Star.png";
    var xpos =innerWidth/2-20;
    var ypos =innerHeight/2-30;
    
setInterval(draw,10);
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


//function shipMovement(e){
//    if(e.keyCode==37)
//       {
//            dx=-2;
//       }
//       else if(e.keyCode==39)
//    {
//        dx=2;
//    }
//}
//function stopShipMovement(e)
//{
//    if(e.keyCode==37)
//       {
//            dx=0;
//       }
//       else if(e.keyCode==39)
//    {
//        dx=0;
//    }  
//}

function draw(){    
    
    dx=0;
    dy=0;
    
    if (keys && keys[37]) {dx = -1; }
  if (keys && keys[39]) {dx = 1; }
  if (keys && keys[38]) {dy = -1; }
  if (keys && keys[40]) {dy = 1; }
    
    xpos=xpos+dx;
    ypos=ypos+dy;
 
    
    ctx.clearRect(0,0,game.width,game.height);
    ctx.drawImage(Starship,xpos-20,ypos-30,40,60);
    ctx.drawImage(Star,100,100,40,40);
    
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


