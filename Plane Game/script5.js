window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var t = Date.now();
  //background
  var x = 0;
  var x1 =1305
  var x2 =0
  let backgroundSpeed = 400;
  let backgroundStartSpeed=200;
  //plane
  var y = 100;
  var planex = 100
  let planeSpeed = 200;
  let planeUpSpeed = 500;
  //coin
  var coinx = 1200;
  var coiny = Math.random() * (500-50);
  var score=0;
  let coinSpeed=300;
  //missile
  let misx=1400;
  let misy=Math.random() * (600-200);
  let missileSpeed=700;
  //startbtn
  let startbtnx= 100;
  let startbtny=250;
  let startGame = 1;
  //Background image
  let background = new Image();                      
  background.src = "Background plane game.jpg";
  //plane image
  let plane = new Image();
  plane.src= "Plane model game.png"; 
  //missile
  let missile = new Image();
  missile.src="missile.png"
  //coin
  let coin= new Image();
  coin.src="coin.png";

// EVENT LISTENERS /////////////////////////////////
  let spaceBarHeldDown = false;
// space bar key down plane movement
  document.addEventListener('keydown', (event) => {  
      if (event.key === ' ') {
        spaceBarHeldDown = true;
      }
    });
// space bar key up plane movement
    document.addEventListener('keyup', (event) => {
      if (event.key === ' ') {                     
        spaceBarHeldDown = false;
      }
    });
//click button/mouse
    let btn = document.getElementById("fly")
    let buttonHeldDown = false;   
// button key down 
    btn.addEventListener('mousedown', () => {        
      buttonHeldDown = true;
    });
//button key up
    btn.addEventListener('mouseup', () => {        
      buttonHeldDown = false;
    });
//Startbtn

// EVENT LISTENERS /////////////////////////////

//Game Loop
  function animateGame() {
  var timePassed = (Date.now() - t) / 1000;
  t = Date.now()
  var fps = Math.round(1 / timePassed);
  ////////////////////DRAW////////////////
  context.clearRect(0, 0, 1300, 600);
  //background
  context.drawImage(background,x,0,1305,500);
  context.drawImage(background,x1,0,1305,500);
  context.drawImage(background,x2,0,1305,500);
  //plane
  context.drawImage(plane,planex,y);
  //coin
  context.drawImage(coin,coinx, coiny, 75, 62)
  //missile
  context.drawImage(missile,misx,misy);
  //FPS
  context.font = '25px Arial';
  context.fillStyle = 'black';
  context.fillText("FPS: " + fps, 20, 30);
  //SCORE
  context.fillText("Score: " + score, 1100,50);
  context.font="25px sans-serif";
  ////////////////////DRAW////////////////
  ////////ANIMATION UPDATE//
  //background movement
  x -= (backgroundSpeed * timePassed);
  if (x <= -1300) {
  x = 1300;
  } ;
  x1 =(x+1300);
  x2=(x-1300);
  //coin movement
  coinx -= (coinSpeed * timePassed);
  if (coinx <= -10) {
   coinx= 1200;
   coiny= Math.random() * (500-50);
  } ;

  if (coinx <= planex+100 && planex <= coinx+50 && coiny <= y+100 && y <= coiny+50){
    coinx= 1200;
    coiny= Math.random() * (500-50);
    score++;
  }
  //missile movement
  misx-=(missileSpeed* timePassed);
  if (misx<=-10) {
    misx=1300;
    misy= Math.random() * (450-50);
  }


  //plane movement
  y+= (planeSpeed*timePassed);
  if(y > 400){
    y = 398
  }
  if (y<-10){
    y = -10 
  }

  if (spaceBarHeldDown) {     
    y-=(planeUpSpeed*timePassed) ;
  }
 
  ////////ANIMATION UPDATE//
  window.requestAnimationFrame(animateGame);
  }

  function startScreen(){
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now()
    let startbtn=new Image();
    startbtn.src="Start Button.png";
    context.clearRect(0, 0, 1300, 600);
    context.drawImage(background,x,0,1305,500);
    context.drawImage(background,x1,0,1305,500);
    context.drawImage(background,x2,0,1305,500);
    context.drawImage(plane,planex,y);
    context.drawImage(startbtn,startbtnx,startbtny)
  //background movement
  x -= (backgroundStartSpeed * timePassed);
  if (x <= -1300) {
  x = 1300;
  } ;
  x1 =(x+1300);
  x2=(x-1300);
  
  window.requestAnimationFrame(startScreen)
  } 
  
  canvas.addEventListener("click", function(event) {                  // NEW
    let rect = canvas.getBoundingClientRect();
    let start=false;
    let clickx = event.clientX - rect.left;
    let clicky = event.clientY - rect.top;
    console.log("Mouse clicked at: (" + clickx + ", " + clicky + ")");
  })

  startScreen();
 





}