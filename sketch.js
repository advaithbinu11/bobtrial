var bob, hiimage, fireballUpImage, fireballDownImage, arrowImage;
var knifeImage, bobJumpImage, bowImage,bow2Image;
var bobWalkImage, bobWalkLeftImage, bobDeadImage, bobDuckLeftImage;
var doorImage, guardStopImage, youWinImage
var outback, winsound, losingsound;
var soundnum;
var gameState, edges;
var downnum = 0;
var down1 = 0, down2 = 1, down3 = 0;
var fireball, fireball1, fireball2;
var cdividedd;
var arrowGroup,arrow2Image;
var bow1, bow2
var bow1State, bow2State
//Width:1366
//Height:768
function preload() {
  hiimage = loadAnimation("BobSaysHi.png")
  bobWalkImage = loadAnimation("alien1.png", "alien2.png");
  bobWalkLeftImage = loadAnimation("alien1copy.png", "alien2copy.png")
  fireballUpImage = loadAnimation("fireballup.png");
  fireballDownImage = loadAnimation("fireballdown.png")
  bowImage = loadImage("Bowandarrow.png")
  bow2Image = loadImage("bowandarrowcopy.png")
  arrowImage = loadImage("arrow.png")
  doorImage = loadImage("door.png")
  knifeImage = loadImage("knife1.png")
  bobDeadImage = loadAnimation("bobDead.png")
  bobDuckImage = loadAnimation("bobduck.png")
  bobDuckLeftImage = loadAnimation("bobduckleft.png")
  youWinImage = loadImage("You Win.png")
  outback = loadSound("outback.mp3")
  winsound = loadSound("puzzle_game_achievement_02.mp3")
  losingsound = loadSound("mission_failed_male.mp3")
  arrow2Image = loadImage("arrowcopy.png")
}
//Width:1366,ratio: 3.415
//Height:656,ratio: 1.64
function setup() {
  createCanvas(displayWidth, displayHeight-112);
  edges = createEdgeSprites()
  bob = createSprite(68*3.415, 336*1.92);
  fireball =createSprite(325*3.415,280*1.64-80);
  fireball1 =createSprite(225*3.415,188*1.64);
  fireball2 =createSprite(131*3.415,202*1.64);
  bob.debug = true
  bob.scale = 0.8*2
  bob.addAnimation("bobright", bobWalkImage);
  bob.addAnimation("bobleft", bobWalkLeftImage);
  bob.addAnimation("bobdead", bobDeadImage);
  bob.addAnimation("bobduck", bobDuckImage);
  bob.addAnimation("bobduckleft", bobDuckLeftImage);
  bob.addAnimation("bobjump", hiimage);
  bob.x = 8*3.415;
  bob.y = 80*1.64
  fireball.addAnimation("fireball1down", fireballDownImage);
  fireball.addAnimation("fireball1up",fireballUpImage);
  fireball1.addAnimation("fireball2down", fireballDownImage);
  fireball1.addAnimation("fireball2up", fireballUpImage);
  fireball2.addAnimation("fireball3down", fireballDownImage);
  fireball2.addAnimation("fireball3up", fireballUpImage);
  fireball.scale=0.4;
  fireball1.scale=0.4;
  fireball2.scale=0.4;
  gameState = "play";
  outback.play()
  arrowGroup = createGroup()
}
//Width:1366,ratio:3.415
//Height:656,ratio:1.64

function draw() {
  if (gameState === "lose" && keyDown("space")) {
    gameState = "play";
    bob.x = 8*3.415;
    bob.y = 80*1.64;
  }
  if (gameState === "play") {
    background(72, 61, 139);
    bob.bounceOff(edges[0])
    bob.bounceOff(edges[1])
    var wall1 = createSprite(150*3.415, 108*1.64, 380*3.415, 20*1.64);
    var wall2 = createSprite(250*3.415, 280*1.64, 380*3.415, 20*1.64);
    //how do I change color of lava?
    var lava = createSprite(200*3.415, 400*1.64, 400*3.415, 10*1.64);
    lava.shapeColor = 'red'
    var platform1=createSprite(24*3.415,355*1.64,50*3.415,10*1.64);
    var platform2=createSprite(100*3.415,355*1.64,50*3.415,10*1.64);
    var platform3=createSprite(200*3.415,375*1.64,50*3.415,10*1.64);
    var platform4=createSprite(300*3.415,375*1.64,50*3.415,10*1.64);
    var platform5=createSprite(380*3.415,375*1.64,70*3.415,10*1.64);
     bow1 = createSprite(300*3.415, 20*1.64);
    var door = createSprite(380*3.415, 330*1.64);
     bow2 = createSprite(50*3.415, 20*1.64);
    //Width:1366,ratio:3.415
//Height:656,ratio:1.64
    door.addImage(doorImage);
    door.scale = 2;
    bow1.scale = 0.6;
    bow1.debug = true
    bow2.debug = true
    bow1.addImage(bowImage);
    bow2.scale = 0.6;
    bow2.addImage(bow2Image);
    if (keyDown("space")&&bob.y>=105) {
      bob.changeAnimation("bobjump", hiimage);
      downnum = 0;
      bob.scale = 1.6
      bob.velocityY = -10;
    }
    if (bow1State == "left"){
      bow1.rotation(-1)
    }
    if (bow1State == "right"){
      bow1.rotation(1)
    }
    if (bow1.isTouching(edges[2])&&bow1State == "left" ){
      bow1State = "right"
    }
    if (bow1.isTouching(edges[3]) &&bow2State == "right" ){
      bow1State = "left"
    }
    if (bob.isTouching(bow1) || bob.isTouching(bow2)||bob.isTouching(fireball) ||bob.isTouching(fireball1)||bob.isTouching(fireball2)||bob.isTouching(lava)||bob.isTouching(arrowGroup)) {
      bob.velocityX = 0;
      bob.velocityY = 0;
      losingsound.play()
      gameState = "lose";
    }
    if(frameCount%60 == 0){
      arrowFunctionone(-45)
    }
    //gravity
    bob.velocityY = bob.velocityY + 0.8;
    bob.collide(wall1)
    bob.collide(wall2)
    bob.collide(platform1)
    bob.collide(platform2)
    bob.collide(platform3)
    bob.collide(platform4)
    bob.collide(platform5)
    if (keyDown("left") && downnum === 0) {
      bob.x = bob.x - 10;
      bob.changeAnimation("bobleft", bobWalkLeftImage)
    }
    if (keyDown("right") && downnum === 0) {
      bob.x = bob.x + 10;
      bob.changeAnimation("bobright", bobWalkImage);
    }
    if (keyDown("left") && downnum === 1) {
      bob.x = bob.x - 10;
      bob.changeAnimation("bobduckleft", bobDuckLeftImage);
    }
    if (keyDown("right") && downnum === 1) {
      bob.x = bob.x + 10;
      bob.changeAnimation("bobduck", bobDuckImage);
    }
    if (keyDown("down")) {
      bob.changeAnimation("bobduck", bobDuckImage);
      bob.scale = 0.9
      downnum = 1;
    }
    //fireball1
    if (fireball.isTouching(wall1)) {
      down1 = 1;
    }
    if (fireball.isTouching(wall2)) {
      down1 = 0;
    }
    if (down1 === 0) {
      fireball.velocityY = -5;
      fireball.changeAnimation("fireball1up", fireballUpImage);
    }
    if (down1 === 1) {
      fireball.velocityY = 5;
      fireball.changeAnimation("fireball1down", fireballDownImage);
    }
    //fireball2
    if (fireball1.isTouching(wall1)){
      down2 = 1;
    }
    if (fireball1.isTouching(wall2)) {
      down2 = 0;
    }
    if (down2 === 0) {
      fireball1.velocityY = -5;
      fireball1.changeAnimation("fireball2up", fireballUpImage);
    }
    if (down2 === 1) {
      fireball1.velocityY = 5;
      fireball1.changeAnimation("fireball2down", fireballDownImage);
    }
    if (fireball2.isTouching(wall1)) {
      down3 = 1;
    }
    if (fireball2.isTouching(wall2)) {
      down3 = 0;
    }
    if (down3 === 0) {
      fireball2.velocityY = -5;
      fireball2.changeAnimation("fireball3up", fireballUpImage);
    }
    if (down3 === 1) {
      fireball2.velocityY = 5;
      fireball2.changeAnimation("fireball3down", fireballDownImage);
    }
    if (bob.isTouching(door)) {
      outback.stop();
      winsound.play();
      gameState = "Win!";
      bob.destroy();
      var win = createSprite(200*3.415, 200*1.64);
      win.scale = 2
      win.addImage(youWinImage);
    }
  }
  if (gameState === "lose") {
    bob.velocityY = 0
    background(72, 61, 139);
    bob.changeAnimation("bobdead", bobDeadImage);
    fireball.velocityY = 0
    fireball1.velocityY = 0
    fireball2.velocityY = 0
  }
  drawSprites();
}
function arrowFunctionone(b1){
  var arrow=createSprite(bow1.x,bow1.y);
  arrow.setCollider("rectangle",0,0,100,10);
  arrow.addImage(arrow2Image);
arrow.setSpeedAndDirection(-7,b1);
arrowGroup.add(arrow);
}
function arrowFunctiontwo(b2){
  var arrow=createSprite(bow2.x,bow2.y);
  arrow.setCollider("rectangle",0,0,100,10);
  arrow.addImage(arrowImage);
arrow.setSpeedAndDirection(-7,b2);
arrowGroup.add(arrow);
}
