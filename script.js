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
    


var stars = [];
var newStarCounter=0;
    
    myShip= new Ship(innerWidth/2,innerHeight/2,40,60,0);
    collision = new Collision(0,0,40,40,0);
    collision.image=new Image();
    collision.image.src="e1.png";
    var counter=0;
    var xpos =innerWidth/2;
    var ypos =innerHeight/2;
    var angle =0;    

setInterval(draw,7);

window.addEventListener('keydown', function (e) {
            keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
           keys[e.keyCode] = false;
        })

var dx=0;  //test
var dy=0;
var velocity=0;
var acceleration=0;
var dangle=0;

var starAngle=0;

function draw(){    
    
    dx=0;
    dy=0;
    dangle=0;
    acceleration=0;
    
    if(myShip.centerX()>innerWidth)
        myShip.setCenterX(0);
    
    if(myShip.centerX()<0)
        myShip.setCenterX(innerWidth);
    
    if(myShip.centerY()>innerHeight)
        myShip.setCenterY(0);
    
    if(myShip.centerY()<0)
        myShip.setCenterY(innerHeight);
    
    
  if (keys && keys[37]) {
      //dx= -1
      dangle = -0.7; }
  if (keys && keys[39]) {
      //dx=1;
      dangle = 0.7;  
  }
  if (keys && keys[38]) {acceleration = 0.04; }
  if (keys && keys[40]) {acceleration = -0.02; }
    
    if(velocity>5)
        velocity=5;
    
     if(velocity<0)
        velocity=0;
 
    
    
    velocity=velocity+acceleration;
    myShip.x=myShip.x+velocity*Math.sin(myShip.angle*Math.PI / 180);
    myShip.y=myShip.y-velocity*Math.cos(myShip.angle*Math.PI / 180);
    
    myShip.angle=myShip.angle+dangle;
 
    ctx.clearRect(0,0,game.width,game.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
        
    //TO DO:: dopisz metodę do Ship center  zwracającą prawdziwy środek staktu
      
      ctx.fillText("położenie środka x "+Math.round(myShip.x), 100, innerHeight-150); 
    //położenie statku x 
      ctx.fillText("położenie środka y "+Math.round(myShip.y), 100, innerHeight-100); 
    //położenie statku y
    

    //tworzenie nowej gwiazdki  !!!
    
   CreateNewStar();
   
    for(let i=0;i<stars.length-1;i++){
        if(stars[i]!=null)
        {
        stars[i].move();
        drawImageRot(Star,stars[i].x,stars[i].y,stars[i].width,stars[i].height,stars[i].angle);  
                
            if(!(Distance(myShip,stars[i])>25)){
                    myShip.destroyed=true;
                    collision.x=myShip.x;
                    collision.y=myShip.y;
                    collision.width=myShip.width;
                    collision.height=myShip.height;
                    collision.angle=myShip.angle;
            }
          
            if((stars[i].centerX>innerWidth)||(stars[i].centerX<0)||(stars[i].centerY<0)||(stars[i].centerY>innerHeight)){
                            console.log("gwiazda znika");
                            stars[i]=null;
                            //console.log(stars);
                        }
        }
    }
    
  
const results = stars.filter(element => {
  return element !== null;
});
console.log(toString(results)+" "+stars.length);
stars=results;    


    
    if(starAngle >360)
        starAngle=0;
        
    if(!myShip.destroyed){    drawImageRot(Starship,myShip.x,myShip.y,myShip.width,myShip.height,myShip.angle);
        
        var frequency=velocity/5;
        counter += 0.1;
        if(counter>5)
        counter=0;
        
        if(counter>5-frequency*5)
         drawImageRot(exhaust,myShip.x+(myShip.width+4)*Math.sin(-myShip.angle*Math.PI / 180),myShip.y+(myShip.width+4)*Math.cos(myShip.angle*Math.PI / 180),40,60,myShip.angle+90);
        
        
        collision.state=1;
    }else{
        if(collision.state<95){
            ctx.fillText("Kolizja", innerWidth/2, innerHeight/2);

            drawImageRot(collision.image,collision.x-collision.width/2,collision.y-                                     collision.height/2,collision.width*2,collision.height*2,collision.angle);

            collision.nextState();
        }
    }
        

    ctx.fillText("x :"+Math.round(myShip.x)+" "+ " y: "+Math.round(myShip.y), 100, innerHeight-50); 
    //położenie statku
    ctx.fillText("distance "+Math.round(Distance(myShip,obstacle)), 100, innerHeight-100); 
    // test funkcji Distance
     ctx.fillText("velocity "+Math.round(velocity), 100, innerHeight-140); 
    // velocity
    
    
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
 this.angle=0;
 this.rotation=0;
 this.velocityX=0;
 this.velocityY=0;
}

Obstacle.prototype.centerX = function(){
 return (this.x+this.width/2);   
}

Obstacle.prototype.centerY = function(){
 return (this.y+this.height/2);   
}

Obstacle.prototype.move = function(){
 this.x=this.x+this.velocityX;   
 this.y=this.y+this.velocityY;
 this.angle=this.angle+this.rotation;
}


function Ship(px,py,pwidth,pheight,pangle)
{
 this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
 this.angle=pangle;
 this.destroyed=false;
}

Ship.prototype.centerX = function(){
 return (this.x+this.width/2);   
}

Ship.prototype.centerY = function(){
 return (this.y+this.height/2);   
}

Ship.prototype.setCenterX = function(newPos){
 this.x=newPos-this.width/2;   
}

Ship.prototype.setCenterY = function(newPos){
 this.y=newPos-this.height/2; 
}

function Collision(px,py,pwidth,pheight,pangle)
{
 this.x=px;
 this.y=py;
 this.width=pwidth;
 this.height=pheight;
 this.angle=pangle;
 this.state=1;
 this.image=new Image();
 this.image.src="e1.png";
}

Collision.prototype.nextState = function() {
    if(this.state<100)   
        {
        this.state=this.state+1.5;
        if(this.state===1){
            this.image.src="e1.png";
            }
            else if (this.state<20) {
            this.image.src="e2.png";
            }
            else if (this.state<40) {
            this.image.src="e3.png";
            }
            else if (this.state<65) {
            this.image.src="e4.png";
            }
            else if (this.state<80) {
            this.image.src="e5.png";
            }
            else if (this.state<90) {
            this.image.src="e6.png";
            }
            
        return this.state + 1;
        }
        else 
        {
            return this;
        }
};

function Distance(a,b)
{    
    return Math.sqrt(((b.x+b.width/2)-(a.x+a.width/2))*((b.x+b.width/2)-(a.x+a.width/2))
                    +((b.y+b.height/2)-(a.y+a.height/2))*((b.y+b.height/2)-(a.y+a.height/2)));
}


function CreateNewStar(){
     newStarCounter+=0.1
    if(newStarCounter>=30){
    stars.push(new Obstacle(100,200,40,40));
        stars[stars.length-1].velocityX=-1;
        stars[stars.length-1].velocityY=0;
        stars[stars.length-1].rotation=1;
        newStarCounter=0;
    }
}





