function Powerup(x, y, type) {
  this.x = x;
  this.y = y;
  this.w = 20;
  this.h = 20;
  this.type = type;
  this.img;
  this.glow = 0;
  this.iglow = document.getElementById("poGlow");


  Weapons.forEach((w) => {
    if(this.type == "SPEAR" && this.type == w.weaponType) {
      this.img = document.getElementById(w.powerupSprite);
      this.w = 29;
      this.h = 29;
    }
    if(this.type == "CANNON" && this.type == w.weaponType) {
      this.img = document.getElementById(w.powerupSprite);
      this.w = 37;
      this.h = 36;
    }
    if(this.type == "WAND" && this.type == w.weaponType) {
      this.img = document.getElementById(w.powerupSprite);
      this.w = 25;
      this.h = 25;
    }
    if(this.type == "BOW" && this.type == w.weaponType) {
      this.img = document.getElementById(w.powerupSprite);
      this.w = 28;
      this.h = 28;
    }
    if(this.type == "SWORD" && this.type == w.weaponType) {
      this.img = document.getElementById(w.powerupSprite);
      this.w = 37;
      this.h = 37;
    }
  });

  this.show = function() {
    area.ctx.drawImage(this.img, this.x, this.y);
    if(this.glow) area.ctx.drawImage(this.iglow, this.x - 5, this.y - 5);
  }

}
