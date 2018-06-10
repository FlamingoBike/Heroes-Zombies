function Projectile(x, y, type, angle) {
  this.x = x;
  this.y = y;
  this.w = 21;
  this.h = 21;
  this.life = 1000;
  this.dmg = 0;
  this.type = type;
  this.angle = angle;
  this.speedX = Math.cos(this.angle);
  this.speedY = Math.sin(this.angle);

  if(this.type == "SPEAR") {
    this.img = document.getElementById("pSpear");
    this.life = 20;
    this.speedX *= 4;
    this.speedY *= 4;
    this.dmg = 1;
    this.w = 21;
    this.h = 21;
  } else if(this.type == "CANNON") {
    this.img = document.getElementById("pCannon");
    this.life = 50;
    this.speedX *= 5;
    this.speedY *= 5;
    this.dmg = 3;
    this.w = 9;
    this.h = 9;
  } else if(this.type == "WAND") {
    this.img = document.getElementById("pMage");
    this.life = 75;
    this.speedX *= 6;
    this.speedY *= 6;
    this.dmg = 0.2;
    this.w = 11;
    this.h = 11;
  } else if(this.type == "BOW") {
    this.img = document.getElementById("pArcher");
    this.life = 150;
    this.speedX *= 5;
    this.speedY *= 5;
    this.dmg = 1;
    this.w = 16;
    this.h = 8;
  } else if(this.type == "SWORD") {
    this.img = document.getElementById("pSwordsman");
    this.life = 100;
    this.speedX *= 2.5;
    this.speedY *= 2.5;
    this.dmg = 0.1;
    this.w = 22;
    this.h = 48;
  }

  this.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.cx = this.x + (this.w / 2);
    this.cy = this.y + (this.h / 2);

    this.life--;

    if(this.type == "BOW" && this.dmg < 8) this.dmg += 0.05;
  }

  this.show = function() {
    if(this.type == "BOW" && this.dmg >= 5) this.img = document.getElementById("pArcherH");
    else if(this.type == "BOW" && this.dmg < 5) this.img = document.getElementById("pArcher");

    area.ctx.save();
    area.ctx.translate(this.x, this.y);
    area.ctx.rotate(this.angle);
    area.ctx.drawImage(this.img, -this.w / 2, -this.h / 2);
    area.ctx.restore();
  }

}
