var canvas, ctx, w, h;
var cols, rows, field, particles, zoff;
const size = 10,
   r = 1,
   maxSpeed = 5;
var baseHue = random(0, 360);
var inc = 0.0026;
const { floor, sin, cos, PI, abs } = Math;

//event listeners for onlaod & resize
window.addEventListener("resize", init);
window.addEventListener("load", init);

//initial funtion
function init() {
   //setting things up
   time = Date.now();
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");
   w = canvas.width = window.innerWidth;
   h = canvas.height = window.innerHeight;
   ctx.strokeStyle = "white";
   ctx.lineWidth = 2;
   ctx.lineCap = "round";

   //to get fps
   current = Date.now();
   fps = document.getElementById("fps");

   //column and rows
   cols = floor(w / size) + 1;
   rows = floor(h / size) + 1;
   field = make2darray(rows, cols);
   particles = [];
   zoff = 0;

   //to make number of particles according to the size of screen
   let num = floor((w * h) / 900);
   for (let i = 0; i < num; i++) {
      particles.push(new Particle());
   }

   // to calculate flow field in the begining
   for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
         updateField(x, y);
      }
   }

   //drawing function
   draw();
}

function draw() {
   calcFPS();
   // ctx.rect(0, 0, w, h);
   // ctx.fillStyle = "rgba(26,26,26,0.005)";
   // ctx.fill();

   for (let i = 0; i < particles.length; i++) {
      particles[i].border_control();
      particles[i].draw();
      particles[i].update();
   }
   zoff += inc;
   requestAnimationFrame(draw);
}

//to update flow field cells
function updateField(x, y) {
   let angle = noise(time + x / 50, time + y / 50, zoff) * PI * 4;
   let x1 = r * cos(angle);
   let y1 = r * sin(angle);
   let index = y + x * cols;
   field[y][x] = vector(x1, y1);
}

//to return a vector
function vector(a, b) {
   let v = {
      x: a,
      y: b
   };
   return v;
}

//making 2d arrays
function make2darray(cols, rows) {
   let arr = new Array(cols);
   for (let j = 0; j < arr.length; j++) {
      arr[j] = new Array(rows);
   }
   return arr;
}

//function to return random number between a range
function random(min, max) {
   return Math.random() * (max - min) + min;
}

//calculation of fps
function calcFPS() {
   //current time - last
   let timeDiff = Date.now() - current;

   //update time
   current = Date.now();

   fps.innerText = "fps: " + Math.floor(1000 / timeDiff);
}
