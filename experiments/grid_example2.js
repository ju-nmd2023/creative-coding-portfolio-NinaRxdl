const size = 40;
const gap = 40;
const amount = 16;
let grid = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(3); 

  for (let x = 0; x < amount; x++) {
    grid[x] = [];
    for (let y = 0; y < amount; y++) {
      grid[x][y] = "white";
    }
  }
}

function drawElement(cellColor, isHovered) {
  const fields = 4;
  const s = size / fields;
  for (let x = 0; x < fields; x++) {
    for (let y = 0; y < fields; y++) {
      noStroke();
      if (Math.random() < 0.5) {
        if (isHovered && cellColor === "white") {
          fill(random(255), random(255), random(255));
        } else if (cellColor === "white") {
          fill(255);
        }
        square(x * s, y * s, s);
      }
    }
  }
}

function draw() {
  background(0, 0, 0);

  const centerX = (width - size) / 2;
  const centerY = (height - size) / 2;

  for (let gx = 0; gx < amount; gx++) {
    for (let gy = 0; gy < amount; gy++) {
      let xPosition = centerX + (gx - amount / 2) * (size + gap);
      let yPosition = centerY + (gy - amount / 2) * (size + gap);

      if (amount % 2 === 0) {
        xPosition += size / 2;
      }

      let isHovered =
        mouseX > xPosition &&
        mouseX < xPosition + size &&
        mouseY > yPosition &&
        mouseY < yPosition + size;

      push();
      translate(xPosition, yPosition);
      drawElement(grid[gx][gy], isHovered);
      pop();
    }
  }
}
