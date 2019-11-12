class Particle {
   constructor() {
      this.x = random(0, cols * size);
      this.y = random(0, rows * size);
      this.v = vector(random(-0.5, 0.5), random(-0.5, 0.5));
      this.acc = vector(0, 0);
      this.px = this.x;
      this.py = this.y;
   }
   update() {
      let x = floor(this.x / size);
      let y = floor(this.y / size);

      if (x < cols && y < rows && this.x > 0 && this.y > 0) {
         updateField(x, y);
         this.acc = field[y][x];
      }

      //console.log(this.v.x);
      this.v.x += this.acc.x;
      this.v.y += this.acc.y;
      if (
         this.v.x > maxSpeed ||
         this.v.x < -maxSpeed ||
         this.v.y > maxSpeed ||
         this.v.y < -maxSpeed
      ) {
         this.v.x /= maxSpeed;
         this.v.y /= maxSpeed;
      }
      this.px = this.x;
      this.py = this.y;
      this.x += this.v.x;
      this.y += this.v.y;
      this.acc = vector(0, 0);
   }
   border_control() {
      if (this.x > w) {
         this.px = this.x = 0;
      } else if (this.x < -1) {
         this.px = this.x = w - 1;
      }
      if (this.y > h) {
         this.py = this.y = 0;
      } else if (this.y < -1) {
         this.py = this.y = h - 1;
      }
   }
   draw() {
      ctx.beginPath();
      let c = (floor(zoff * 50) + baseHue) % 360;
      ctx.strokeStyle = "hsla(" + c + ",100%,50%,0.082)";
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.px, this.py);
      ctx.stroke();
      ctx.closePath();
   }
}
