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
  var highscore=0;
  let coinSpeed=300;
  //missile
  let misx=1400;
  let misy=Math.random() * (600-200);
  let missileSpeed=700;
  //startbtn
  let startbtnx= 100;
  let startbtny=250;
  //sound button
  let soundOn= new Image();
  soundOn.src="sound on.png"

  let soundOff=new Image();
  soundOff.src="sound off.png"
  
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

//Startbtn

// EVENT LISTENERS /////////////////////////////

let coinSound= new Audio();
coinSound.src="zapsplat_foley_money_british_coin_20p_set_down_on_other_coins_in_hand_change_001_90492.mp3";

let planeSound1=new Audio();
planeSound1.src="smartsound_TRANSPORTATION_ULTRALIGHT_PLANE_Fly_Slow_Steady_Loop_01.mp3";

let radioSound=new Audio();
radioSound.src="zapsplat_vehicles_airplane_atc_comm_pilot_radio_indistinguishable_006_39882.mp3";

let gameOverSound= new Audio();
gameOverSound.src="mixkit-negative-guitar-tone-2324.wav";

let soundTrack = new Audio();
soundTrack.src="crash-override-classic-arcade-game-116842.mp3"


canvas.addEventListener("click", function(event) {                  // NEW
  let rect = canvas.getBoundingClientRect();
  let clickx = event.clientX - rect.left;
  let clicky = event.clientY - rect.top;
  console.log("Mouse clicked at: (" + clickx + ", " + clicky + ")");
  //120 - 264    285 - 338 co ordinates for start button
  //this changes the state when button is clicked
  if (clickx > 120 && clickx<264 && clicky > 285 && clicky<338  ){
    if(state=1){
    console.log("button clicked"); 
    state = 2;
    console.log("state"+state);
  }
}
  if (clickx > 1207 && clickx<1277 && clicky > 400 && clicky<460){
  if(sound==2){
    console.log("sound off"); 
    soundTrack.pause();
    sound = 1;
  }
}
if (clickx > 1157 && clickx<1207 && clicky > 400 && clicky<460 ){
  if(sound==1){
    console.log("sound on"); 
    sound = 2;
    soundTrack.volume=0.08;
    soundTrack.play();
  }
}

})


//Game Loop
  function animateGame() {
  var timePassed = (Date.now() - t) / 1000;
  t = Date.now()
  var fps = Math.round(1 / timePassed);

  if (sound == 2){
    planeSound1.volume=0.2;
    planeSound1.play();
  }
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
    if (sound == 2){
    coinSound.play();
    }
    coiny= Math.random() * (500-50);
    score++;
  }
  //missile movement
  misx-=(missileSpeed* timePassed);
  if (misx<=-10) {
    misx=1300;
    misy= Math.random() * (450-50);
  }

  // loop ends if missile hits plane, return to start
  if (misx <= planex+100 && planex <= misx+150 && misy <= y+20 && y <= misy+50){
    //state1 is start screen
    state=1;
    y=100;
    coinx= 1200;
    misx=1300;
  //highscore 
    if(score>highscore){
      highscore=score-highscore+highscore;
    }
    if(sound==2){
      planeSound1.pause();
      radioSound.volume=0.1;
      radioSound.play();
      gameOverSound.volume=0.1;
      gameOverSound.play(); 
    }

    score=0;
    return startScreen();
  }

  //plane movement
  y+= (planeSpeed*timePassed);
  if(y > 400){
    y = 398
  }
  if (y<-10){
    y = -10 
    planeSound1.pause();
  }

  if (spaceBarHeldDown) {     
    y-=(planeUpSpeed*timePassed) 
    if (sound == 2){
    planeSound1.volume=0.3;
    planeSound1.play();
    }
  }
  ////////ANIMATION UPDATE//
  window.requestAnimationFrame(animateGame);
  }


  let sound=1;
  sound==1;
  let state=1


  function startScreen(){
    var timePassed = (Date.now() - t) / 1000;
    t = Date.now()
    let startbtn=new Image();
    startbtn.src="Start Button.png";
    context.clearRect(0, 0, 1300, 600);
    context.drawImage(background,x,0,1305,500);
    context.drawImage(background,x1,0,1305,500);
    context.drawImage(background,x2,0,1305,500);
    context.fillText("Best: " + highscore, 1100,50);
    context.font="25px sans-serif";
    context.drawImage(plane,planex,y);
    context.drawImage(startbtn,startbtnx,startbtny)
 
    context.drawImage(soundOff,1200,400,70,60)
    
    context.drawImage(soundOn,1140,400,70,60)
    
  
  //background movement
  x -= (backgroundStartSpeed * timePassed);
  if (x <= -1300) {
  x = 1300;
  } ;
  x1 =(x+1300);
  x2=(x-1300);
  //state 2 animates game
  if (state==2)
  return animateGame();
  window.requestAnimationFrame(startScreen)
  } 

startScreen();

}
