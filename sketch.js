// Particles array
let particles = [];

// Flow field info
let flowField;
let cols, rows;

// Useful adjustable variables (add UI controls?)
let scale = 1; 
let increment = 0.02; 
let turbulence = 0.002;  
let jitter = 0.1; 

let canvas;
let aboutSection;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Initialize cols/rows
  cols = floor(width / scale);
  rows = floor(height / scale);

  // Fill flow field array
  flowField = new Array(cols * rows);

  // Add particles from Class
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }

  aboutSection = document.querySelector("#particles");
  
  // Create canvas and position it inside the #about section
  canvas = createCanvas(aboutSection.offsetWidth, aboutSection.offsetHeight);
  canvas.position(aboutSection.offsetLeft, aboutSection.offsetTop);

//   background("rgb(0,3,60)");
//   canvas.style('z-index', '-1');
}

function draw() {
  // Loop through flow field
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      
      // Adjust Perlin noise for smoother motion
      let angle = noise(xoff, yoff, frameCount * turbulence) * TWO_PI * 1.5; 
      
      // Add a subtle current to guide motion
      angle += sin(frameCount * 0.002 + x * 0.02 + y * 0.03) * 0.4; 
      
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += increment;
    }
    yoff += increment;
  }

  for (let p of particles) {
    p.follow(flowField);
    p.update();
    p.edges();
    p.show();
  }
}

// PARTICLE CLASS
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
    this.color = color(random(10, 60), random(100, 180), random(200, 255), 40); // Less transparency for fluidity
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = constrain(x + y * cols, 0, vectors.length - 1);
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos.set(random(width), random(height));
      this.prevPos.set(this.pos);
    }
  }

  show() {
    stroke(this.color);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.set(this.pos);
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

