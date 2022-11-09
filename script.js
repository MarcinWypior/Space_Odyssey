   var game=document.getElementById("game");
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

function draw(){
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


