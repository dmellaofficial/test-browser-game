const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game State Variables
let score = 0;
let player = { x: 270, y: 340, width: 60, height: 20, color: "#6366f1", speed: 8 };
let target = { x: Math.random() * 550, y: 0, size: 20, speed: 3, color: "#f59e0b" };

let keys = { ArrowLeft: false, ArrowRight: false };

// Listen for Keyboard Input
window.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
window.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

function update() {
    // Move Player
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

    // Move Target (Falling down)
    target.y += target.speed;

    // Collision Detection (Catching the target)
    if (
        target.y + target.size >= player.y &&
        target.x >= player.x &&
        target.x <= player.x + player.width
    ) {
        score += 10;
        target.y = 0;
        target.x = Math.random() * (canvas.width - target.size);
        target.speed += 0.5; // Gets slightly faster each time!
    }

    // Reset if target hits the floor
    if (target.y > canvas.height) {
        target.y = 0;
        target.x = Math.random() * (canvas.width - target.size);
    }
}

function draw() {
    // Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player Paddle
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Falling Target
    ctx.fillStyle = target.color;
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw Score Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("Score: " + score, 20, 30);
}

// Main Game Loop (Runs continuously at 60fps)
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

// Start the game loop
loop();
