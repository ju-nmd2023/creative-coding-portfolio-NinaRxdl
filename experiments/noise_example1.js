let seed = 0;
let layers = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateLayers();
}

class Point {
  constructor(x, y, noise) {
    this.x = x;
    this.y = y;
    this.noise = noise;
  }
}

function generateHorizon(base, maxHeight, offset) {
  let points = [];
  for (let i = 0; i < width; i++) {
    const noiseValue = noise(i / 70, offset); 
    const y = base + noiseValue * maxHeight;
    const point = new Point(i, y, noiseValue);
    points.push(point);
  }
  return points;
}

function generateLayers() {
  let h = 800; // --> moving the layers up/down
  let maxHeight = 60; // --> outburst of the noise 
  let offset = 0;

  while (h > 0) {
    layers.push({
      base: h,
      maxHeight: maxHeight,
      offset: offset,
    });
    h -= 100; // --> lower number = more layers; higher number  = less layers
    offset += 1000; // --> for different movement of the lines/layers
  }
}

function draw() {
  background(34, 39, 46);

  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    let t = frameCount * 0.02;
    let horizon = generateHorizon(layer.base, layer.maxHeight, t + layer.offset);

    stroke(144, 238, 144, 10);
    fill(144, 238, 144, 10);
    beginShape();
    vertex(0, 0);
    for (let p of horizon) {
      vertex(p.x, p.y);
    }
    vertex(width, 0);
    endShape();
  }
}
