function draw_bar(x, y, w, h, progress, color) {
  var real_size = (progress * h) / 100;
  area.ctx.fillStyle = color;
  area.ctx.fillRect(x, y, w, real_size);
  area.ctx.stroke();
}

function draw_text(text, x, y, color) {
  area.ctx.fillStyle = color;
  area.ctx.fillText(text, x, y);
}

function draw_weapon() {
  area.ctx.drawImage(get_weapon(player.weapon), 145, 733);
  draw_text(player.weapon, 130, 795, "#FFFFFF");
  draw_text("ATK: WIP bikesuper", 210, 745, "#FFFFFF");
}

function draw_skills() {
  
}

function draw_line(x, y, ex, ey, color) {
  area.ctx.strokeStyle = color;
  area.ctx.beginPath();
  area.ctx.moveTo(x, y);
  area.ctx.lineTo(ex, ey);
  area.ctx.stroke();
}