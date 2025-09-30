// In this project I had to refer a lot to the P5.js documentation. Especially when it came to the noise and mixing the colors together. 
// I really wanted to recreate the 'Honmoon' from the movie 'Kp Demon Hunters' and put a lot of time and effort into this. 
// I had trouble creating the waves and giving it the look that I wanted. After a lot of trying and playing with values I achieved a result I was happy with.

let song;

window.addEventListener("load", () => {
  song = new Tone.Player("assets/music/Golden-Huntrix.mp3").toDestination();
  song.autostart = true;
});

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);
}
const numLines = 30;
const step = 8;
let counter = 0;

function draw() {
  background(10, 20, 50);

  let Turquoise = color(0, 200, 255, 255);
  let Gold = color(212, 175, 55, 255);
  let Pink = color(255, 0, 226, 255);

  for (let j = 0; j < numLines; j++) {
    const yBase = (j + 1) * (height / (numLines + 1));

    for (let x = 0; x < width; x += step) {
      // two waves to have a start and end point 
      const wave1 = noise(x * 0.002, counter + j * 0.1) * 2 - 1;
      const wave2 = noise((x + step) * 0.002, counter + j * 0.1) * 2 - 1;

      const amplitude = 50 + j;
      const y1 = yBase + wave1 * amplitude;
      const y2 = yBase + wave2 * amplitude;

      let t = map(wave1, -1, 1, 0, 1);
      let colour;

      if (t < 0.5) {
        // lerpColor blends two colors 
        colour = lerpColor(Turquoise, Gold, t * 2);
      } else {
        colour = lerpColor(Gold, Pink, (t - 0.5) * 3);
      }

      stroke(red(colour), green(colour), blue(colour), 50);
      strokeWeight(10);
      line(x, y1, x + step, y2);

      stroke(colour);
      strokeWeight(4);
      line(x, y1, x + step, y2);
    }
  }
  counter += 0.006;
}
