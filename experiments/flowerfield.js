class Agent {
    constructor(x, y, maxSpeed, maxForce) {
      this.position = createVector(x, y);
      this.lastPosition = createVector(x, y);
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, -1);
      this.maxSpeed = maxSpeed;
      this.maxForce = maxForce;
    }
  
    follow(desiredDirection) {
      desiredDirection = desiredDirection.copy();
      desiredDirection.mult(this.maxSpeed);
      let steer = p5.Vector.sub(desiredDirection, this.velocity);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.lastPosition = this.position.copy();
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    draw() {
        push();
        stroke(34, 139, 34, 60);
        strokeWeight(1.5);
        line(
          this.lastPosition.x,
          this.lastPosition.y,
          this.position.x,
          this.position.y
        );
        pop();
        if (random(1) < 0.002) {
          this.drawLeaforFlower();
        }
      }
    
      drawLeaforFlower() {
        push();
        translate(this.position.x, this.position.y);
        noStroke();
    
        if (random(1) < 0.7) {
          // green leaves
          fill(34, 139, 34, 255);
          rotate(random(PI));
          ellipse(0, 0, random(10, 20), random(4, 10));
        } else {
          // flower 
          fill(random(200, 255), random(100, 200), random(100, 255), 225);
          for (let i = 0; i < 10; i++) {
            ellipse(8, 5, 15, 8);
            rotate(PI / 3);
          }
          fill(255, 200, 0, 225);
          ellipse(0, 0, 6, 6);
        }
    
        pop();
      }
    }
  
  function setup() {
    createCanvas(innerWidth, innerHeight);
    background(255);
    field = generateField();
    generateAgents();
  }
  
  function generateField() {
    let field = [];
    noiseSeed(Math.random() * 1000);
    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const angle = -HALF_PI + (noise(x / 10, y / 10) - 0.5) * PI / 3;
        field[x].push(p5.Vector.fromAngle(angle));
      }
    }
    return field;
  }
  
  function generateAgents() {
    for (let i = 0; i < 300; i++) {
      let agent = new Agent(
        Math.random() * innerWidth,
        innerHeight,                
        2,
        0.05
      );
      agents.push(agent);
    }
  }
  
  const fieldSize = 20;
  const maxCols = Math.ceil(innerWidth / fieldSize);
  const maxRows = Math.ceil(innerHeight / fieldSize);
  let field;
  let agents = [];
  
  function draw() {
    for (let agent of agents) {
      const x = Math.floor(agent.position.x / fieldSize);
      const y = Math.floor(agent.position.y / fieldSize);
      if (x >= 0 && x < maxCols && y >= 0 && y < maxRows) {
        const desiredDirection = field[x][y];
        agent.follow(desiredDirection);
        agent.update();
        agent.draw();
      }
    }
  }
  