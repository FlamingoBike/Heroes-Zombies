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

  Weapons.forEach((w) => {
    if(this.type == "SPEAR" && this.type == w.weaponType) {
      this.img = document.getElementById(w.projectileSprite);
      this.life = 20;
      this.speedX *= 4;
      this.speedY *= 4;
      this.dmg = w.damage;
      this.w = 21;
      this.h = 21;
    }
    if(this.type == "CANNON" && this.type == w.weaponType) {
      this.img = document.getElementById(w.projectileSprite);
      this.life = 50;
      this.speedX *= 5;
      this.speedY *= 5;
      this.dmg = w.damage;
      this.w = 9;
      this.h = 9;
    }
    if(this.type == "WAND" && this.type == w.weaponType) {
      this.img = document.getElementById(w.projectileSprite);
      this.life = 75;
      this.speedX *= 6;
      this.speedY *= 6;
      this.dmg = w.damage;
      this.w = 11;
      this.h = 11;
    }
    if(this.type == "BOW" && this.type == w.weaponType) {
      this.img = document.getElementById(w.projectileSprite);
      this.life = 150;
      this.speedX *= 5;
      this.speedY *= 5;
      this.dmg = w.damage;
      this.w = 16;
      this.h = 8;
    }
    if(this.type == "SWORD" && this.type == w.weaponType) {
      this.img = document.getElementById(w.projectileSprite);
      this.life = 100;
      this.speedX *= 2.5;
      this.speedY *= 2.5;
      this.dmg = w.damage;
      this.w = 22;
      this.h = 48;
    }
  });

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
