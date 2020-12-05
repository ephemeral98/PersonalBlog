class Star {
  constructor(id, x, y, ctx) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.r = Math.floor(Math.random() * 2) + 1;
    const alpha = Math.floor(Math.random() * 10 + 1) / 10 / 2;
    this.color = `rgba(255, 255, 255, ${alpha})`;
  }

  draw() {
    this.ctx.fillStyle = this.color; // 填充色
    this.ctx.shadowBlur = this.r * 2; // 阴影
    this.ctx.beginPath(); // 开始路径
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false); //弧
    this.ctx.closePath(); // 闭合路径
    this.ctx.fill(); // 图形填充
  }

  move() {
    this.y -= 1;
    if (this.y <= -10) {
      this.y = window.innerHeight + 10;
    }

    this.x -= 1;
    if (this.x <= -10) {
      this.x = window.innerWidth + 10;
    }

    this.draw();
  }
}

export default Star;
