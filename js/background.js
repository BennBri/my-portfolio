let t = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseSpeed = 0;
let smoothedSpeed = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  noStroke();
}

function draw() {
  background(0, 0, 0, 0);
  drawGradient();
  drawWaves();

  // Calcola velocità istantanea
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  mouseSpeed = sqrt(dx * dx + dy * dy);

  // Interpolazione morbida (inertia)
  smoothedSpeed = lerp(smoothedSpeed, mouseSpeed, 0.05);

  // Mappa la velocità smorzata
  let speedFactor = map(smoothedSpeed, 0, 100, 0.01, 0.06, true);
  t += speedFactor;

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

// --- SFONDO A GRADIENTE ---
function drawGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color("#22819F"), color("#17C3B3"), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// --- ONDE MORBIDE E NATURALI ---
function drawWaves() {
  push();
  translate(0, height * 0.9);
  rotate(radians(-8));
  scale(1.3, 1);

  for (let i = 0; i < 4; i++) {
    noStroke();
    let alpha = 60 - i * 10;
    fill(255, 255, 255, alpha);

    beginShape();
    curveVertex(0, 300);

    for (let x = 0; x <= width * 0.8; x += 2) {
      let wave =
        sin(x * 0.01 + t * 1.2 + i) * 30 +
        sin(x * 0.02 + t * 0.8 + i * 0.5) * 20 +
        noise(x * 0.005, t * 0.5 + i) * 15;

      let y = wave - i * 40;
      curveVertex(x, y);
    }

    curveVertex(width * 0.8, 300);
    curveVertex(width, 300);
    endShape(CLOSE);
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}