function Player(x, y) {
  this.x = x;
  this.y = y;
  this.weapon = "SPEAR";
  this.w = 44;
  this.h = 44;
  this.cd = 0;
  this.maxcd = 50;
  this.animation = 0;
  this.angle = 0;

  this.update = function() {

    if(this.weapon == "SPEAR") {
      this.w = 44;
      this.h = 44;
      this.maxcd = 50;
    } else if(this.weapon == "CANNON") {
      this.w = 34;
      this.h = 44;
      this.maxcd = 100;
    } else if(this.weapon == "WAND") {
      this.w = 42;
      this.h = 44;
      this.maxcd = 4;
    } else if(this.weapon == "BOW") {
      this.w = 34;
      this.h = 34;
      this.maxcd = 60;
    } else if(this.weapon == "SWORD") {
      this.w = 34;
      this.h = 34;
      this.maxcd = 80;
    }

    if(this.x + this.w > area.width)
        this.x = area.width - this.w;
    if(this.x < 0)
        this.x = 0;
    if(this.y + this.h > area.height)
        this.y = area.height - this.h;
    if(this.y < 0)
        this.y = 0;

    if(this.cd > 0)
        this.cd -= 1;
    if(this.animation > 0)
        this.animation -= 1;

    this.cx = this.x + (this.w / 2);
    this.cy = this.y + (this.h / 2);

    this.calcangle();

    if(click) this.attack();
  }

  this.show = function() {
    if(this.animation == 0) {
      if(this.weapon == "SPEAR")
        this.img = document.getElementById("imgCharacter0");
      else if(this.weapon == "CANNON")
        this.img = document.getElementById("imgCannoneer0");
      else if(this.weapon == "WAND")
        this.img = document.getElementById("imgMage0");
      else if(this.weapon == "BOW")
        this.img = document.getElementById("imgArcher0");
      else if(this.weapon == "SWORD")
        this.img = document.getElementById("imgSwordsman0");
    } else {
      if(this.weapon == "SPEAR")
        this.img = document.getElementById("imgCharacter1");
      else if(this.weapon == "CANNON")
        this.img = document.getElementById("imgCannoneer0");
      else if(this.weapon == "WAND")
        this.img = document.getElementById("imgMage0");
      else if(this.weapon == "BOW")
        this.img = document.getElementById("imgArcher0");
      else if(this.weapon == "SWORD")
        this.img = document.getElementById("imgSwordsman1");
    }

      area.ctx.save();
  		area.ctx.translate(this.x, this.y);
  		area.ctx.rotate(this.angle);
  		area.ctx.drawImage(this.img, -this.w / 2, -this.h / 2);
  		area.ctx.restore();
  }

  this.move = function(x, y) {
    this.x += x;
    this.y += y;
  }

  this.calcangle = function() {
    var dx = mouseX - this.x;
    var dy = mouseY - this.y;
    var rads = Math.atan2(dy, dx);
    this.angle = rads;
  }

  this.attack = function() {
    if(this.cd <= 0) {
      if(this.weapon == "SPEAR")
        Projectiles.push(new Projectile(this.x, this.y, "SPEAR", this.angle));
      else if(this.weapon == "CANNON")
        Projectiles.push(new Projectile(this.x, this.y, "CANNON", this.angle));
      else if(this.weapon == "WAND")
        Projectiles.push(new Projectile(this.x, this.y, "WAND", this.angle));
      else if(this.weapon == "BOW")
        Projectiles.push(new Projectile(this.x, this.y, "BOW", this.angle));
      else if(this.weapon == "SWORD")
        Projectiles.push(new Projectile(this.x, this.y, "SWORD", this.angle));
      this.cd = this.maxcd;
      this.animation = this.maxcd / 2;
    }
  }
}
