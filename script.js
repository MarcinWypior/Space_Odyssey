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
    var Asteroid=new Image();
    Asteroid.src="asteroid.png";
    var gatheredStars=0;
    
var stars = [];
var asteroids = [];
var newStarCounter=0;
var newAsteroidCounter=0;
    
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

//CreateNewAsteroidAfterCollision(sizeOfNewAsteroid,x,y,velocityX,velocityY);
CreateNewAsteroidAfterCollision(100,200,200,1,0);
CreateNewAsteroidAfterCollision(100,innerWidth-200,200,-1,0);
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
    
    ctx.fillText("położenie środka y "+Math.round(myShip.y), 100, innerHeight-100); 
    //zebrane gwiazdki
    ctx.fillText("zebrane gwiazdki "+gatheredStars, innerWidth-170, innerHeight-100); 
    
    if(asteroids[0]!=null){
            ctx.fillText("odległość statku od Asteroidy  "+Math.round(Distance(myShip,asteroids[0])), 170, innerHeight/4); 
}
    //console.log("myShip.width: "+(Math.round(myShip.width)));
    //console.log("Math.round(asteroids[0].width)): "+(Math.round(asteroids[0].width)));
    
    //tworzenie nowej gwiazdki  !!!
    
   CreateNewStar();
    
         newAsteroidCounter+=0.1
    if(newAsteroidCounter>=57){
   CreateNewAsteroid(100);
    }
    
    for(let i=0;i<stars.length;i++){
        if(stars[i]!==null)
        {
        stars[i].move();
            drawImageRot(Star,stars[i].x,stars[i].y,stars[i].width,stars[i].height,stars[i].angle);  
            
                            
            
            if((stars[i].centerX()>innerWidth)||(stars[i].centerX()<0)||(stars[i].centerY()<0)||(stars[i].centerY()>innerHeight)){
                            stars[i]=null;
                //console.log("gwiazdka znika");
                continue;
                        }
            
            
              if((Distance(myShip,stars[i])<(stars[i].width-5))){
                    stars[i]=null;
                    gatheredStars+=1;
                  continue;
            }
                     
        }
        
    }
    
    for(let i=0;i<asteroids.length;i++){
        
        if(asteroids[i]==null)
            continue;
        
                    if(Distance(myShip,asteroids[i])<(asteroids[i].width/2+myShip.width/4)){
                        //console.log("Kolizja z Asteroidą");
                    myShip.destroyed=true;
                    collision.x=myShip.x;
                    collision.y=myShip.y;
                    collision.width=myShip.width;
                    collision.height=myShip.height;
                    collision.angle=myShip.angle;
                    }
        
        
                if(asteroids[i]!==null){
                    asteroids[i].move();
            drawImageRot(Asteroid,asteroids[i].x,asteroids[i].y,asteroids[i].width,asteroids[i].height,asteroids[i].angle);
                    
                }
        
                    if((asteroids[i].centerX()>innerWidth+100)||(asteroids[i].centerX()<-100)||(asteroids[i].centerY()<-100)||(asteroids[i].centerY()>innerHeight+100)){
                            asteroids[i]=null;
                            //console.log("asteroida znika");
                            continue;
                        }
        
        
                for(let j=0; j<asteroids.length;j++){
                    
                    if(i===j)
                    continue;
                    
                    if(asteroids[i]==null || asteroids[j]==null)
                        continue;
                    
                    
                    console.log("odległość asteroid"+Distance(asteroids[i],asteroids[j]));
                    
                    if(Distance(asteroids[i],asteroids[j])<(asteroids[i].width/2.4+asteroids[i].width/2.4))
                    {
                        console.log("asteroidy znikają");
                        asteroids[i]=null;
                        asteroids[j]=null; 
                    }  
                    
                    
                }
        
        
    }
    
  
const resultsStars = stars.filter(element => {
  return element !== null;
});
//console.log(toString(results)+" "+stars.length);
stars=resultsStars;    
    
    const resultsAsteroids = asteroids.filter(element => {
  return element !== null;
});
//console.log(toString(results)+" "+stars.length);
asteroids=resultsAsteroids;   
    
    
    console.log("asteroidy:" +asteroids.length + "\n gwiazdki:"+stars.length);
    // KOMETA !!!
    
    
    //drawImageRot(Asteroid,100,100,200,200,0); grafika asteroidy


    
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
    
    
//    ctx.fillText("distance "+Math.round(Distance(myShip,obstacle)), 100, innerHeight-100); 
//    // test funkcji Distance
//     ctx.fillText("velocity "+Math.round(velocity), 100, innerHeight-140); 
//    // velocity
    
    
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
    
        let random=(Math.floor(Math.random() * 4)+1)%4;
        
    let newStarX; 
     let newStarY;
    let newStarVelocityX;
    let newStarVelocityY;
        
    if(random==0){
        newStarX = 0; 
        newStarY = Math.floor(Math.random() * innerHeight) + 1; 
        newStarVelocityY= Math.floor(Math.random() * 1)-0.5;
        newStarVelocityX= Math.floor(Math.random() * 2)+2;
    }
        
    if(random==1){
       newStarX =  innerWidth-1; 
        newStarY = Math.floor(Math.random() * innerHeight) + 1; 
        newStarVelocityY= Math.floor(Math.random() * 1)-0.5;
        newStarVelocityX= (-1)* Math.floor(Math.random() * 2)-2;
    }
       
   if(random==2){
       newStarX = Math.floor(Math.random() * innerWidth) + 1; 
        newStarY = 0; 
        newStarVelocityY= Math.floor(Math.random() * 2)+2;
        newStarVelocityX= Math.floor(Math.random() * 1)-0.5;
   }
       
  if(random==3){
       newStarX = Math.floor(Math.random() * innerWidth) + 1; 
        newStarY = innerHeight-1;  
        newStarVelocityY= (-1)*Math.floor(Math.random() * 2)-2;
        newStarVelocityX= Math.floor(Math.random() * 1)-0.5;
  }
        
//     let newStarX = Math.floor(Math.random() * innerWidth) + 1; 
//     let newStarY = Math.floor(Math.random() * innerHeight) + 1; 
//    console.log("wylosowana szerokość: "+newStarX);
//    console.log("wylosowana wysokość: "+newStarY);
        
        if(newStarX!=undefined&&newStarY!=undefined){
        stars.push(new Obstacle(newStarX-20,newStarY-20,40,40));
        stars[stars.length-1].velocityX=newStarVelocityX;
        stars[stars.length-1].velocityY=newStarVelocityY;
        stars[stars.length-1].rotation=(Math.abs(newStarVelocityY)+
            Math.abs(newStarVelocityX))/3;
        newStarCounter=0;
    
    
    
        }else{
            console.log("!!! wylosowana wartość :  "+random);
        }
        
    }
     
}


function CreateNewAsteroid(sizeOfNewAsteroid){

    let random=(Math.floor(Math.random() * 4)+1)%4;
        
    let newAsteroidX; 
     let newAsteroidY;
    let newAsteroidVelocityX;
    let newAsteroidVelocityY;
        
    if(random==0){
        newAsteroidX = 0; 
        newAsteroidY = Math.floor(Math.random() * innerHeight) + 1; 
        newAsteroidVelocityY= Math.floor(Math.random() * 1)-0.5;
        newAsteroidVelocityX= Math.floor(Math.random() * 2)+2;
    }
        
    if(random==1){
       newAsteroidX =  innerWidth-1; 
        newAsteroidY = Math.floor(Math.random() * innerHeight) + 1; 
        newAsteroidVelocityY= Math.floor(Math.random() * 1)-0.5;
        newAsteroidVelocityX= (-1)* Math.floor(Math.random() * 2)-2;
    }
       
   if(random==2){
       newAsteroidX = Math.floor(Math.random() * innerWidth) + 1; 
        newAsteroidY = 0; 
        newAsteroidVelocityY= Math.floor(Math.random() * 2)+2;
        newAsteroidVelocityX= Math.floor(Math.random() * 1)-0.5;
   }
       
  if(random==3){
       newAsteroidX = Math.floor(Math.random() * innerWidth) + 1; 
        newAsteroidY = innerHeight-1;  
        newAsteroidVelocityY= (-1)*Math.floor(Math.random() * 2)-2;
        newAsteroidVelocityX= Math.floor(Math.random() * 1)-0.5;
  }
        
        
        if(newAsteroidX!=undefined&&newAsteroidY!=undefined){
    asteroids.push(new Obstacle(newAsteroidX-20,newAsteroidY-20,sizeOfNewAsteroid,sizeOfNewAsteroid));
        asteroids[asteroids.length-1].velocityX=newAsteroidVelocityX;
        asteroids[asteroids.length-1].velocityY=newAsteroidVelocityY;
        asteroids[asteroids.length-1].rotation=(Math.abs(newAsteroidVelocityY)+
            Math.abs(newAsteroidVelocityX))/3;
        newAsteroidCounter=0;
    
    
        }else{
            console.log("!!! wylosowana wartość :  "+random);
        }
        
}

function CreateNewAsteroidAfterCollision(sizeOfNewAsteroid,x,y,velocityX,velocityY){

    let random=(Math.floor(Math.random() * 4)+1)%4;
        
    let newAsteroidX; 
     let newAsteroidY;
    let newAsteroidVelocityX;
    let newAsteroidVelocityY;

     asteroids.push(new Obstacle(x-sizeOfNewAsteroid/2,y-sizeOfNewAsteroid/2,sizeOfNewAsteroid,sizeOfNewAsteroid));
        asteroids[asteroids.length-1].velocityX=velocityX;
        asteroids[asteroids.length-1].velocityY=velocityY;
        asteroids[asteroids.length-1].rotation=0;
    
    console.log("próbna asteroida stworzona");
}

