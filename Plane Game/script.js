window.onload = function () {
  const canvas = document.querySelector('#canvas');
  var context = canvas.getContext("2d");
  


  
  

  let background = new Image();                      //Background image
    background.src = "Background plane game.jpg";
    var x = -650;                                       // x axis of Backround 1
    var x1 = 650;                                       // x axis of Background 2
    function backgroundMovement(){
      let speed = 1.5;
      x -= (speed);                   //background image 1 movement
      if (x <= -1300) {                            //Once background 1 completed movement while background 2 follows creating an infinite cycle and illusion of plane moving
          x = 1300;
      }
      x1 -= (speed );                  // background image 2 movement
      if (x1 <= -1300) {
          x1 = 1300;
      }
  }

  let plane = new Image();
  plane.src= "Plane model game.png";  
  var y = 100;                              
  var xPlane=100;                       //y axis of plane                             
  //Space Bar
  let spaceBarHeldDown = false;
  document.addEventListener('keydown', (event) => {  // space bar key down plane movement
      if (event.key === ' ') {
        spaceBarHeldDown = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === ' ') {                       // space bar key up plane movement
        spaceBarHeldDown = false;
      }
    });
    //click button/mouse
    let btn = document.getElementById("fly")

    let buttonHeldDown = false;   

            

    btn.addEventListener('mousedown', () => {      // button key down   
      buttonHeldDown = true;
    });
    btn.addEventListener('mouseup', () => {        //button key up
      buttonHeldDown = false;
    });
    let planeSound=new Audio();
    planeSound.src="smartsound_TRANSPORTATION_ULTRALIGHT_PLANE_Fly_Slow_Steady_Loop_01.mp3";
    function planeMovement(){
      let speed=1.5;               
      y+= (speed);
      planeSound.pause();
  
    if (spaceBarHeldDown) {
        y-= 4;
        planeSound.play();
    }
    if (buttonHeldDown){
        y-=4;
        planeSound.play();
    }
    if (y>400){
      y=400 ;
    }
    if (y<-10){
      y=-10 ;
    }
    }

    let missile = new Image();
    missile.src="missile.png"
      let misx=1400;
      let misy=Math.random() * (600-200);
      function missileMovement(){
        let speed=5;
        misx-=(speed);
        misy+=(0.05);
        if (misx<=0){
          misx=1400;
          misy=Math.random() * (600-200);
        }
        if (misy<=0){
          misx=1400;
          misy=Math.random() * (600-200);           
        }
      }

      let coin= new Image();
      coin.src="coin.png";
      var coinx = 1200;
      var coiny = Math.random() * (500-50);
      function coinMovement(){
        let speed=2.5;
        coinx -= (speed);                   //background image 1 movement
        if (coinx <= 0) {                            //Once background 1 completed movement while background 2 follows creating an infinite cycle and illusion of plane moving
            coinx = 1200;
            coiny = Math.random() *(500-50);  
        }
      }
      let coinSound= new Audio();
      coinSound.src="zapsplat_foley_money_british_coin_20p_set_down_on_other_coins_in_hand_change_001_90492.mp3";
      
      let score=0
      function coinCollect(){
        if (coinx <= xPlane+100 && xPlane <= coinx+50 && coiny <= y+100 && y <= coiny+50){ //score
          score++;
          coinSound.play();
          coinx = 1200;
          coiny = Math.random() *(500-50); 
      }
    }
    let gameSound= new Audio();
    gameSound.src="music_zapsplat_gliding_136.mp3"; 

    let planeSound1=new Audio();
    planeSound1.src="smartsound_TRANSPORTATION_ULTRALIGHT_PLANE_Fly_Slow_Steady_Loop_01.mp3";

    let startbtn=new Image();
    startbtn.src="Start Button.png";
    let startbtnx= 100;
    let startbtny=250;
    
    
    
    function drawStartScreen() {
      
      context.clearRect(0, 0, 1300, 500);
      context.drawImage(background,x,0,1305,500);
      context.drawImage(background,x1,0,1305,500);
      context.drawImage(plane,xPlane,y);
      context.drawImage(startbtn, startbtnx,startbtny);
      } 
    function startScreenloop(){
      
      requestAnimationFrame(startScreenloop);
      drawStartScreen();
      backgroundMovement();
      
      }

    function drawGameLoop() {              
      context.clearRect(0, 0, 1300, 500);
      context.drawImage(background,x,0,1305,500);
      context.drawImage(background,x1,0,1305,500);
      context.drawImage(plane,xPlane,y);
      context.drawImage(coin,coinx, coiny, 75, 62);
      context.drawImage(missile,misx, misy,170,120)
      context.fillText("Score: " + score, 1100,50);
      context.font="25px sans-serif";
    }

  function gameLoop(){// animation
    //gameSound.play();
    gameSound.volume=0.2;
    planeSound1.play();
    planeSound1.volume=0.1;
    planeSound.volume=0.3;
    drawGameLoop();
    backgroundMovement();
    planeMovement();
    coinMovement();
    coinCollect();
    missileMovement();
    requestAnimationFrame(gameLoop);
  }
  //startScreen();
  //gameLoop();
  startScreenloop();
  canvas.addEventListener("click", function(event) {                  // NEW
    let rect = canvas.getBoundingClientRect();
    let clickx = event.clientX - rect.left;
    let clicky = event.clientY - rect.top;
    console.log("Mouse clicked at: (" + clickx + ", " + clicky + ")");
    if (clickx>=startbtnx&&clicky>=startbtny){
     return gameLoop();
    }
    
});  

    /*let startbtn=new Image();
    startbtn.src="Start Button.png";
    let startbtnx= 100;
    let startbtny=250;*/


}