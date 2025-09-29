let agents = [];

class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;

    let colors = [
        [196, 159, 235, 100], // purple
        [254, 248, 197, 100], // yellow
        [234, 195, 224, 100], // light pink 
        [250, 186, 118, 100]  // light orange  
      ];

      this.color = random(colors);
  }

  follow(target) {
    let desiredDirection = p5.Vector.sub(target, this.position);
    desiredDirection.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  separate(agents) {
    const desiredSeparation = 20;
    let steer = createVector(0, 0);
    let count = 0;
  
    for (let other of agents) {
      const distance = p5.Vector.dist(this.position, other.position);
      if (distance > 0 && distance < desiredSeparation) {
        steer.add(
          p5.Vector.sub(this.position, other.position)
            .normalize()
            .div(distance)
        );
        count++;
      }
    }
    if (count > 0) {
      steer.div(count)
           .setMag(this.maxSpeed)
           .sub(this.velocity)
           .limit(this.maxForce);
    }
    return steer;
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

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    stroke(this.color);
    strokeWeight(3);
    line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0);
  generateAgents();
}

function generateAgents() {
    for (let i = 0; i < 200; i++) {
      let agent = new Agent(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        4,
        0.1
      );
      agents.push(agent);
    }
  }

function draw() {
  let mouse = createVector(mouseX, mouseY);

  for (let agent of agents) {
    let followForce = agent.follow(mouse);
    let sepForce = agent.separate(agents);

    followForce.mult(1.0);
    sepForce.mult(1.5);

    agent.applyForce(followForce);
    agent.applyForce(sepForce);

    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}
