var area = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.width = 1000;
    this.height = 800;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "900 30px Serif";
    this.interval = setInterval(draw, 1000/60);
  },
  clear : function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

var heldA = false;
var heldW = false;
var heldS = false;
var heldD = false;
var aTime;
var wTime;
var sTime;
var dTime;
var pressE = false;
var pressX = false;

var pause = 0;
var eController = {
  spawnTimer: 0,
  maxSpawn: 100,
}
/*var pController = {
  spawnTimer: 1000,
  maxSpawn: 1000,
}*/

var Projectiles = [];
var Enemies = [];
var Powerups = [];
var player = new Player(400, 300);

var stext = {
  score: 0,
  x: 6,
  y: 26,
}

var mouseX = 400;
var mouseY = 300;
var mouseHeld = false;
var mouseTime;
var click = 0;

function startup() {
  area.start();
}

function draw() {
	area.clear();

  drawbg();

  drawScene();

  if(eController.spawnTimer == 0 && pause == 0) {
    var rx = Math.floor(Math.random() * 2);
    var ry = Math.floor(Math.random() * 2);
    if(rx == 0) rx = Math.floor(Math.random() * 51);
    else rx = area.width - 50 + Math.floor(Math.random() * 51);
    if(ry == 0) ry = Math.floor(Math.random() * 51);
    else ry = area.height - 50 + Math.floor(Math.random() * 51);
    Enemies.push(new Enemy(rx, ry, "ZOMBIE"));
    eController.spawnTimer = eController.maxSpawn;
  }

  /*if(pController.spawnTimer == 0 && pause == 0) {
    var rx = Math.floor(Math.random() * (area.width - 40));
    var ry = Math.floor(Math.random() * (area.height - 40))
    var types = ["SPEAR", "CANNON", "WAND", "BOW"];
    var rtype = types[Math.floor(Math.random() * types.length)];
    Powerups.push(new Powerup(rx, ry, rtype));
    pController.spawnTimer = pController.maxSpawn;
  }*/

  player.show();
  player.update();

  for(var i = 0; i < Projectiles.length; i++) {
    Projectiles[i].show();
    Projectiles[i].update();
    if(Projectiles[i].life <= 0) Projectiles.splice(i, 1);
  }

  for(var i = 0; i < Enemies.length; i++) {
    Enemies[i].show();
    Enemies[i].update();
    for(var j = 0; j < Projectiles.length; j++) {
      // Proj. center-point collision with zombie

      /*console.log("----- Proj -----");
      console.log("X: " + Projectiles[j].x + " Y: " + Projectiles[j].y + " CX: " + Projectiles[j].cx + " CY: " + Projectiles[j].cy);
      console.log("----- Enemy -----");
      console.log("X: " + Enemies[i].x + " Y: " + Enemies[i].y);*/
      if(Projectiles[j].type == "SWORD") {
        if(dist2(Projectiles[j].x + (Projectiles[j].w / 2), Projectiles[j].y + (Projectiles[j].h / 2), Enemies[i].x + (Enemies[i].w / 2), Enemies[i].y + (Enemies[i].h / 2)) < (Enemies[i].x + (Enemies[i].w / 2) + Projectiles[j].x + (Projectiles[j].w / 2)))  {
          Enemies[i].hp -= Projectiles[j].dmg;
        }
      } else {
        if(Projectiles[j].cx > Enemies[i].x && Projectiles[j].cx < Enemies[i].x + Enemies[i].w && Projectiles[j].cy > Enemies[i].y && Projectiles[j].cy < Enemies[i].y + Enemies[i].h) {
          Enemies[i].hp -= Projectiles[j].dmg;
          Projectiles.splice(j, 1);
        }
      }
    }
    if(Enemies[i].hp <= 0) {
      var c_powerup = Math.random() * 100;
      if(c_powerup >= 0 && c_powerup < 20) { // Spawn a Powerup at the enemy defeated
        var types = ["SPEAR", "CANNON", "WAND", "BOW", "SWORD"];
        var rtype = types[Math.floor(Math.random() * types.length)];
        Powerups.push(new Powerup(Enemies[i].x, Enemies[i].y, rtype));
      }
      Enemies.splice(i, 1);
      stext.score++;
    }
  }

  for(var i = 0; i < Powerups.length; i++) {
    Powerups[i].show();
    if(player.x > Powerups[i].x && player.x < Powerups[i].x + Powerups[i].w && player.y > Powerups[i].y && player.y < Powerups[i].y + Powerups[i].h) {
      Powerups[i].glow = 1;
      if(pressE) {
        player.weapon = Powerups[i].type;
        Powerups.splice(i, 1);
      } else if(pressX) {
        stext.score += 50;
        Powerups.splice(i, 1);
      }
    } else Powerups[i].glow = 0;
  }

  click = 0;
  pressE = false;
  pressX = false;
  eController.spawnTimer--;
  /*pController.spawnTimer--;*/
}

function drawbg() {
  var bg = document.getElementById("imgBackground");
  area.ctx.drawImage(bg, 0, 0);
}

function drawScene() {
  area.ctx.fillText("Score: " + stext.score, stext.x, stext.y);
}

function logmouse(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function keydown(event) {
  var key = event.key;
  if(key == 'a' || key == 'A') {
    heldA = true;
    window.clearTimeout(aTime);
    useA();
  }
  if(key == 'd' || key == 'D') {
    heldD = true;
    window.clearTimeout(dTime);
    useD();
  }
  if(key == 'w' || key == 'W') {
    heldW = true;
    window.clearTimeout(wTime);
    useW();
  }
  if(key == 's' || key == 'S') {
    heldS = true;
    window.clearTimeout(sTime);
    useS();
  }
}

function keyup(event) {
  var key = event.key;
  if(key == 'a' || key == 'A') {
    heldA = false;
    window.clearTimeout(aTime);
  }
  if(key == 'd' || key == 'D') {
    heldD = false;
    window.clearTimeout(dTime);
  }
  if(key == 'w' || key == 'W') {
    heldW = false;
    window.clearTimeout(wTime);
  }
  if(key == 's' || key == 'S') {
    heldS = false;
    window.clearTimeout(sTime);
  }
  if(key == 'e' || key == 'E') {
    pressE = true;
  }
  if(key == 'x' || key == 'X') {
    pressX = true;
  }
}

function useA() {
  if(heldA) {
    player.move(-0.5, 0);
    aTime = setTimeout("useA()", 1);
  } else {
    window.clearTimeout(aTime);
    return;
  }
}

function useD() {
  if(heldD) {
    player.move(0.5, 0);
    dTime = setTimeout("useD()", 1);
  } else {
    window.clearTimeout(dTime);
    return;
  }
}

function useW() {
  if(heldW) {
    player.move(0, -0.5);
    wTime = setTimeout("useW()", 1);
  } else {
    window.clearTimeout(wTime);
    return;
  }
}

function useS() {
  if(heldS) {
    player.move(0, 0.5);
    sTime = setTimeout("useS()", 1);
  } else {
    window.clearTimeout(sTime);
    return;
  }
}

function mousedown(event) {
  mouseHeld = true;
  window.clearTimeout(mouseTime);
  playerShoot();
}

function mouseup(event) {
  mouseHeld = false;
  window.clearTimeout(mouseTime);
  click = 1;
}

function playerShoot() {
  if(mouseHeld) {
    // Implement a shot cooldown to reduce shot spam and discourage autoclickers
      click = 1;
      mouseTime = setTimeout("playerShoot()", 1);
        //
  } else {
    window.clearTimeout(mouseTime);
    return;
  }
}

function stopGame() {
  pause = 1;
  Enemies = [];
}

function dist2(x0, y0, x1, y1) {
  return (x0-x1)*(x0-x1) + (y0-y1)*(y0-y1);
}
