function Powerup(x, y, type) {
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.type = type;
  this.img;
  this.glow = 0;
  this.iglow = document.getElementById("poGlow");

  if(this.type == "SPEAR") {
    this.img = document.getElementById("poSpear");
    this.w = 29;
    this.h = 29;
  } else if(this.type == "CANNON") {
    this.img = document.getElementById("poCannon");
    this.w = 37;
    this.h = 36;
  } else if(this.type == "WAND") {
    this.img = document.getElementById("poWand");
    this.w = 25;
    this.h = 25;
  } else if(this.type == "BOW") {
    this.img = document.getElementById("poBow");
    this.w = 28;
    this.h = 28;
  } else if(this.type == "SWORD") {
    this.img = document.getElementById("poSword");
    this.w = 37;
    this.h = 37;
  }

  this.show = function() {
    area.ctx.drawImage(this.img, this.x, this.y);
    if(this.glow) area.ctx.drawImage(this.iglow, this.x - 5, this.y - 5);
  }

}
