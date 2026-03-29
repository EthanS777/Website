let particles = [];
let flowField, cols, rows;
let scale = 1, increment = 0.02, turbulence = 0.002;
let canvas, aboutSection;

function setup() {
  aboutSection = document.querySelector("#p5-canvas-container");
  canvas = createCanvas(aboutSection.offsetWidth, aboutSection.offsetHeight);
  canvas.parent("p5-canvas-container");
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowField = new Array(cols * rows);

  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, frameCount * turbulence) * TWO_PI * 1.5;
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

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
    this.color = color(random(200, 255), random(0, 0), random(0, 55), 40);
  }
  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = constrain(x + y * cols, 0, vectors.length - 1);
    this.applyForce(vectors[index]);
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
    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.pos.set(random(width), random(height));
      this.prevPos.set(this.pos);
    }
  }
  show() {
    stroke(this.color);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos.set(this.pos);
  }
}

function windowResized() {
  resizeCanvas(aboutSection.offsetWidth, aboutSection.offsetHeight);
}