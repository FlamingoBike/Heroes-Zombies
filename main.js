var area = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.width = 1000;
    this.height = 800;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "900 16px Arial";
    this.interval = setInterval(draw, 1000/60);
  },
  clear : function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

// Keyboard and Mouse controls
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

var mouseX = 400;
var mouseY = 300;
var mouseHeld = false;
var mouseTime;
var click = 0;
//

// Game controller variables
var pause = false;
var is_boss = false;
var spawnmobs = true;
//

// Game mechanics variables
var Projectiles = [];
var Enemies = [];
var Powerups = [];
var player = new Player(400, 300);
var Weapons = [
  new Weapon("SPEAR", "imgCharacter0", "poSpear", "pSpear", 1),
  new Weapon("CANNON", "imgCannoneer0", "poCannon", "pCannon", 3),
  new Weapon("WAND", "imgMage0", "poWand", "pWand", 0.2),
  new Weapon("BOW", "imgArcher0", "poBow", "pArcher", 1),
  new Weapon("SWORD", "imgSwordsman0", "poSword", "pSwordsman", 0.1)
];

var enemy_controller = {
  spawnTimer: 0,
  maxSpawn: 100,
};
//

// Game statistics
var enemykills_text = {
  value: 0,
  x: 0, // Temporary, will add in a statistics display
  y: 0,
};
var score_text = {
  value: 0,
  x: 6,
  y: 26,
};
//

function startup() {
  area.start();

}

function draw() {
	area.clear();

  drawbg();

  drawScene();

  if(enemy_controller.spawnTimer == 0 && !pause && spawnmobs) {
    var rx = Math.floor(Math.random() * 2);
    var ry = Math.floor(Math.random() * 2);
    if(rx == 0) rx = Math.floor(Math.random() * 51);
    else rx = area.width - 50 + Math.floor(Math.random() * 51);
    if(ry == 0) ry = Math.floor(Math.random() * 51);
    else ry = area.height - 100 - 50 + Math.floor(Math.random() * 51);
    Enemies.push(new Enemy(rx, ry, "ZOMBIE"));
    enemy_controller.spawnTimer = enemy_controller.maxSpawn;
  }

  player.show();
  player.update();

  //Show projectiles
  for(var i = 0; i < Projectiles.length; i++) {
    Projectiles[i].show();
    Projectiles[i].update();
    if(Projectiles[i].life <= 0) Projectiles.splice(i, 1);
  }

  for(var i = 0; i < Enemies.length; i++) {
    Enemies[i].show();
    Enemies[i].update();
    for(var j = 0; j < Projectiles.length; j++) {
      /*console.log("----- Proj -----");
      console.log("X: " + Projectiles[j].x + " Y: " + Projectiles[j].y + " CX: " + Projectiles[j].cx + " CY: " + Projectiles[j].cy);
      console.log("----- Enemy -----");
      console.log("X: " + Enemies[i].x + " Y: " + Enemies[i].y);*/

      // Rotate canvas before checking collisions
      area.ctx.save();
      area.ctx.translate(Enemies[i].x, Enemies[i].y);
      area.ctx.rotate(Enemies[i].angle);

      if(Projectiles[j].type == "SWORD") { // Proj. center-point radius collision with zombie
        if(dist2(Projectiles[j].x + (Projectiles[j].w / 2), Projectiles[j].y + (Projectiles[j].h / 2), Enemies[i].x + (Enemies[i].w / 2), Enemies[i].y + (Enemies[i].h / 2)) < (Enemies[i].x + (Enemies[i].w / 2) + Projectiles[j].x + (Projectiles[j].w / 2)))  {
          Enemies[i].hp -= Projectiles[j].dmg;
        }
      } else { // Proj. center-point collision with zombie
        if(Projectiles[j].cx > Enemies[i].x && Projectiles[j].cx < Enemies[i].x + Enemies[i].w && Projectiles[j].cy > Enemies[i].y && Projectiles[j].cy < Enemies[i].y + Enemies[i].h) {
          Enemies[i].hp -= Projectiles[j].dmg;
          Projectiles.splice(j, 1);
        }
      }

      // Restore canvas position
      area.ctx.restore();

    }
    //Check if enemy is dead
    if(Enemies[i].hp <= 0) {
      var powerup_chance = Math.random() * 100;
      if(powerup_chance >= 0 && powerup_chance < 20) { // Spawn a Powerup at the enemy defeated
        var rweapon = Weapons[Math.floor(Math.random() * Weapons.length)].weaponType;
        Powerups.push(new Powerup(Enemies[i].x, Enemies[i].y, rweapon));
      }
      if(Enemies[i].type == "BOSSZOMBIE") {
        is_boss = false;
        spawnmobs = true;
      }
      Enemies.splice(i, 1);
      enemykills_text.value++;
      score_text.value += 10;
    }
  }

  //Show powerups
  for(var i = 0; i < Powerups.length; i++) {
    Powerups[i].show();
    if(player.x > Powerups[i].x && player.x < Powerups[i].x + Powerups[i].w && player.y > Powerups[i].y && player.y < Powerups[i].y + Powerups[i].h) {
      Powerups[i].glow = 1;
      if(pressE) {
        player.weapon = Powerups[i].type;
        Powerups.splice(i, 1);
      } else if(pressX) {
        score_text.value += 50;
        Powerups.splice(i, 1);
      }
    } else Powerups[i].glow = 0;
  }

  //Draw HUD
  drawScene();

  click = 0;
  pressE = false;
  pressX = false;

  checkboss();

  if(!pause && spawnmobs)
    enemy_controller.spawnTimer--;
  /*pController.spawnTimer--;*/
}

//Draws the background
function drawbg() {
  var bg = document.getElementById("imgBackground");
  area.ctx.drawImage(bg, 0, 0);
}

var hp = 400;
var maxHp = 400;

var hud_vars = [
  weapon = "",
  damage = 0,
  desc = 0
];

// Draw HUD
function drawScene() {
  //Draw score text
  draw_text("Score: " + score_text.value, score_text.x, score_text.y, "#000000");

  // Draw HUD
  var hud_hp = document.getElementById("imgBox");
  area.ctx.drawImage(hud_hp, 0, 700);
  // Test HP
  hp--;
  if (hp <= 0) hp = maxHp;
  // Draw HP Bar
  draw_bar(2, 798, 96, -96, percent(hp, maxHp), "#FF0000");
  // Draw HP Text (Centered)
  draw_text(hp, 45 - (hp.toString().length * 5) , 755, "#000000");

  // Draw bar
  var bar = document.getElementById("imgBar");
  area.ctx.drawImage(bar, 100, 700);

  //Draw weapon equipped
  draw_text("Weapon", 135, 720, "#FFFFFF");
  draw_weapon();
  //draw_line(100, 750, 200, 750, "#FFFFFF");
}

function checkboss() {
  if(enemykills_text.value % 50 == 0 && enemykills_text.value != 0 && !is_boss) {
    var rx = Math.floor(Math.random() * 2);
    var ry = Math.floor(Math.random() * 2);
    if(rx == 0) rx = Math.floor(Math.random() * 51);
    else rx = area.width - 50 + Math.floor(Math.random() * 51);
    if(ry == 0) ry = Math.floor(Math.random() * 51);
    else ry = area.height - 50 + Math.floor(Math.random() * 51);
    Enemies.push(new Enemy(rx, ry, "BOSSZOMBIE"));
    is_boss = true;
    spawnmobs = false;
  }
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
  pause = true;
  Enemies = [];
}

function dist2(x0, y0, x1, y1) {
  return (x0-x1)*(x0-x1) + (y0-y1)*(y0-y1);
}
