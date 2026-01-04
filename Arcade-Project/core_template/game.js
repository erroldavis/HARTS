/*******************************************************
 * ARCADE CORE TEMPLATE (Vanilla JS + HTML5 Canvas)
 * Reuse this for multiple arcade game projects.
 *
 * Included:
 * - Game loop (deltaTime)
 * - Keyboard input
 * - Game states (START / PLAYING / PAUSED / GAME_OVER)
 * - HUD (score, lives, level, time)
 * - Restart + Pause
 * - Utility helpers (clamp, collision AABB, random)
 *******************************************************/


/*******************************************************
 * PROJECT INFO (Students edit this section only)
 *******************************************************/
const PROJECT_INFO = {
  school: "HART High School",
  grade: "9th Grade",
  year: "2025–2026",
  createdBy: "Your Name Here",
  gameTitle: "My Arcade Game"
};
 
/*******************************************************
 * AUDIO
 *******************************************************/
const hitSound = new Audio("audio/hit.wav");
const deathSound = new Audio("audio/death.wav");
const bgMusic = new Audio("audio/bg_music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.4;   // background music softer
hitSound.volume = 0.7;
deathSound.volume = 0.8;


// ====== Canvas Setup ======
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Optional: crisp lines on some displays
ctx.imageSmoothingEnabled = false;

// ====== Game State ======
const GameState = Object.freeze({
  START: "START",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  GAME_OVER: "GAME_OVER",
});

let state = GameState.START;

// ====== Timing ======
let lastTime = 0;
let deltaTime = 0; // seconds (not ms)
let elapsedTime = 0; // total seconds since start of round

// ====== Input System ======
const keysDown = {}; // tracks pressed keys by name

document.addEventListener("keydown", (e) => {
  keysDown[e.key.toLowerCase()] = true;

  // Prevent arrow keys from scrolling the page
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }

  // Quick controls
  if (e.key === "Enter") {
    if (state === GameState.START || state === GameState.GAME_OVER) {
        restartGame();
        state = GameState.PLAYING;

        bgMusic.currentTime = 0;
        bgMusic.play();
    }
  }



  if (e.key.toLowerCase() === "p") {
    togglePause();
  }

  if (e.key.toLowerCase() === "r") {
    restartGame();
    state = GameState.PLAYING;

    bgMusic.currentTime = 0;
    bgMusic.play();

  }
});

document.addEventListener("keyup", (e) => {
  keysDown[e.key.toLowerCase()] = false;
});

// ====== Game Variables (HUD) ======
let score = 0;
let lives = 3;
let level = 1;
let nextHazardScore = 5;

// ====== Demo Entities (Replace these per game) ======
// Player: rectangle controlled by keyboard
const player = {
  x: 100,
  y: 250,
  w: 40,
  h: 40,
  speed: 300, // pixels per second
};

// Hazard/Obstacle: rectangle that bounces around
const hazards = []; //{ x: 600, y: 200, w: 30, h: 30, vx: -220, // pixels per second vy: 160,};

// Used to prevent losing multiple lives in one collision "overlap" moment
let wasCollidingLastFrame = false;

// ====== Main Loop ======
requestAnimationFrame(gameLoop);

function gameLoop(timestampMs) {
  // Convert ms -> seconds
  const timestamp = timestampMs / 1000;

  // Calculate delta time (clamp to avoid giant jumps)
  deltaTime = Math.min(0.05, timestamp - lastTime); // max 50ms step
  lastTime = timestamp;

  if (state === GameState.PLAYING) {
    elapsedTime += deltaTime;
    update(deltaTime);
  }

  draw();
  requestAnimationFrame(gameLoop);
}

// ====== Update ======
function update(dt) {
  // 1) Move player (WASD or Arrow Keys)
  movePlayer(dt);

  // 2) Move hazard
  moveHazards(dt);

  // 3) Collisions
  handleCollisions();

  // 4) Example: score increases over time (placeholder)
  // Replace this with your actual scoring rule per game.
  score += dt * 1; // 1 point per second (demo)

  // Increase hazards every 10 points
  if (Math.floor(score) >= nextHazardScore) {
    spawnHazard();
    nextHazardScore += 5;
  }
}

function movePlayer(dt) {
  let dx = 0;
  let dy = 0;

  // Horizontal
  if (keysDown["arrowleft"] || keysDown["a"]) dx -= 1;
  if (keysDown["arrowright"] || keysDown["d"]) dx += 1;

  // Vertical
  if (keysDown["arrowup"] || keysDown["w"]) dy -= 1;
  if (keysDown["arrowdown"] || keysDown["s"]) dy += 1;

  // Normalize diagonal movement so it isn't faster
  if (dx !== 0 && dy !== 0) {
    const inv = 1 / Math.sqrt(2);
    dx *= inv;
    dy *= inv;
  }

  player.x += dx * player.speed * dt;
  player.y += dy * player.speed * dt;

  // Keep player inside canvas
  player.x = clamp(player.x, 0, canvas.width - player.w);
  player.y = clamp(player.y, 0, canvas.height - player.h);
}

function spawnHazard() {
  hazards.push({
    x: Math.random() * (canvas.width - 30),
    y: Math.random() * (canvas.height - 30),
    w: 30,
    h: 30,
    vx: randRange(-250, 250),
    vy: randRange(-250, 250),
  });
}


function moveHazards(dt) {
  hazards.forEach(h => {
    h.x += h.vx * dt;
    h.y += h.vy * dt;

    if (h.x <= 0 || h.x + h.w >= canvas.width) {
      h.vx *= -1;
    }
    if (h.y <= 0 || h.y + h.h >= canvas.height) {
      h.vy *= -1;
    }
  });
}


function handleCollisions() {
  let collidingThisFrame = false;

  hazards.forEach(h => {
    if (isCollidingAABB(player, h)) {
      collidingThisFrame = true;
    }
  });

  if (collidingThisFrame && !wasCollidingLastFrame) {
    lives--;

    hitSound.currentTime = 0;
    hitSound.play();

    player.x = 100;
    player.y = canvas.height / 2 - player.h / 2;

    if (lives <= 0) {
      lives = 0;
      state = GameState.GAME_OVER;

      bgMusic.pause();
      deathSound.currentTime = 0;
      deathSound.play();

    }
  }

  wasCollidingLastFrame = collidingThisFrame;
}


// ====== Draw ======
function draw() {
  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  drawBackground();

  // Entities
  drawRect(player, "#e9efff");  // player
  hazards.forEach(h => { drawRect(h, "#ff5a7a"); }); // hazard

  // HUD
  drawHUD();

  // Overlays (start/pause/game over screens)
  if (state === GameState.START) drawCenterMessage("Press ENTER to Start", "Move: WASD / Arrows • P Pause • R Restart");
  if (state === GameState.PAUSED) drawCenterMessage("Paused", "Press P to Resume");
  if (state === GameState.GAME_OVER) drawCenterMessage("GAME OVER", "Press ENTER or R to Restart");

  drawProjectInfo();
}

function drawBackground() {
  // Simple grid background for clarity (optional)
  ctx.save();
  ctx.globalAlpha = 0.12;

  const step = 50;
  for (let x = 0; x < canvas.width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawRect(obj, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  ctx.restore();
}

function drawHUD() {
  ctx.save();
  ctx.fillStyle = "rgba(233,239,255,0.9)";
  ctx.font = "16px system-ui, -apple-system, Segoe UI, Roboto, Arial";

  const timeText = `Time: ${elapsedTime.toFixed(1)}s`;
  const scoreText = `Score: ${Math.floor(score)}`;
  const livesText = `Lives: ${lives}`;
  const levelText = `Level: ${level}`;

  ctx.fillText(scoreText, 14, 24);
  ctx.fillText(livesText, 14, 48);
  ctx.fillText(levelText, 14, 72);

  // Right-aligned time
  const timeWidth = ctx.measureText(timeText).width;
  ctx.fillText(timeText, canvas.width - timeWidth - 14, 24);

  ctx.restore();
}

function drawProjectInfo() {
  ctx.save();

  ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillStyle = "rgba(233,239,255,0.9)";
  ctx.textBaseline = "bottom";

  const padding = 12;
  const y = canvas.height - padding;

  // Left side: school | grade | year
  ctx.textAlign = "left";
  ctx.fillText(
    `${PROJECT_INFO.school} | ${PROJECT_INFO.grade} | ${PROJECT_INFO.year}`,
    padding,
    y
  );

  // Right side: Created by
  ctx.textAlign = "right";
  ctx.fillText(
    `Created by: ${PROJECT_INFO.createdBy}`,
    canvas.width - padding,
    y
  );

  ctx.restore();
}

function drawCenterMessage(title, subtitle) {
  ctx.save();

  // Overlay
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = "#e9efff";
  ctx.font = "bold 44px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, canvas.width / 2, canvas.height / 2 - 30);

  // Subtitle
  ctx.font = "18px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillStyle = "rgba(233,239,255,0.85)";
  ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 20);

  // Project info
  ctx.font = "14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.fillStyle = "rgba(233,239,255,0.7)";
  ctx.fillText(
    `${PROJECT_INFO.gameTitle} — ${PROJECT_INFO.createdBy}`,
    canvas.width / 2,
    canvas.height / 2 + 55
  );

  ctx.restore();
}


// ====== Controls ======
function togglePause() {
  if (state === GameState.PLAYING) {
    state = GameState.PAUSED;
    bgMusic.pause();
  } else if (state === GameState.PAUSED) {
    state = GameState.PLAYING;
    bgMusic.play();
  }
}

function restartGame() {
  // Reset HUD
  score = 0;
  lives = 3;
  level = 1;
  elapsedTime = 0;

  // Reset entities
  player.x = 100;
  player.y = canvas.height / 2 - player.h / 2;

  hazards.length = 0;   // clear old hazards
  spawnHazard();        // start with one red box
  nextHazardScore = 5; // reset difficulty scaling

  wasCollidingLastFrame = false;

}

// ====== Utility Helpers ======
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Axis-Aligned Bounding Box collision
function isCollidingAABB(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function randRange(min, max) {
  return Math.random() * (max - min) + min;
}


