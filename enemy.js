function Enemy(x, y, type) {
    this.x = x
    this.y = y
    this.w = 44
    this.h = 44
    this.hp = 0;
    this.cx = this.x + (this.w / 2);
    this.cy = this.x + (this.h / 2);
    this.type = type;
    this.angle = 0
    this.speed = 1;

    if(this.type == "ZOMBIE") {
      this.img = document.getElementById("eZombie");
      this.speed = 0.5;
      this.hp = 2;
      this.w = 44;
      this.h = 44;
    } else if(this.type == "BOSSZOMBIE") {
      this.img = document.getElementById("eBosszombie");
      this.speed = 0.35;
      this.hp = 200;
      this.w = 77;
      this.h = 94;
    }

    this.update = function() {
      this.calcangle();
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      this.cx = this.x + (this.w / 2);
      this.cy = this.y + (this.h / 2);

    }

    this.show = function() {
      area.ctx.save();
  		area.ctx.translate(this.x, this.y);
  		area.ctx.rotate(this.angle);
  		area.ctx.drawImage(this.img, -this.w / 2, -this.h / 2);
  		area.ctx.restore();
    }

    this.calcangle = function() {
      var dx = player.x - this.x;
      var dy = player.y - this.y;
      var rads = Math.atan2(dy, dx);
      this.angle = rads;
    }

}
