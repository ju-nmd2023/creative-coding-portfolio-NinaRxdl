const size = 20;
const gap = 20;
const amount = 16;

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(3);
}

function drawElement(counter) {
    push();
    const fields = 4;
    const s = size / fields;

    const pinkTones = [
      color(255, 190, 246),
      color(255, 105, 180),
      color(255, 150, 200)
    ];
  
    for (let x = 0; x < fields; x++) {
      for (let y = 0; y < fields; y++) {
        push();
        noStroke();
        if (Math.random() < 0.5) { 
          const randomColor = random(pinkTones);
          fill(randomColor);
          square(x * s, y * s, s);
        }
        pop();
      }
    }
    pop();
}  

function draw() {
  background(0, 0, 64);

  const centerX = (width - size) / 2;
  const centerY = (height - size) / 2;
  for (let x = -Math.floor(amount / 2); x < Math.ceil(amount / 2); x++) {
    for (let y = -Math.floor(amount / 2); y < Math.ceil(amount / 2); y++) {
      let xPosition = centerX + x * (size + gap);
      let yPosition = centerY + y * (size + gap);
      if (amount % 2 === 0) {
        xPosition += size / 2;
      }
      push();
      translate(xPosition, yPosition);
      drawElement(0);
      pop();
    }
  }
}
