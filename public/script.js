const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const cellSize = canvas.width / gridSize;

const scoreDisplay = document.getElementById('score');

async function fetchAndRender() {
    const response = await fetch('/api/state');
    const state = await response.json();
    render(state);
}

async function sendDirection(x, y) {
    await fetch('/api/direction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ x, y }),
    });
}

async function stepAndRender() {
    const response = await fetch('/api/step');
    const state = await response.json();
    render(state);
}

function render({ snake, food, score }) {
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });

    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

    scoreDisplay.textContent = score;
}


document.querySelectorAll('#controls button').forEach(button => {
    button.addEventListener('click', async() => {
        const [x, y] = button.dataset.dir.split(',').map(Number);
        //console.log('Button clicked direction:', x,y);
        await sendDirection(x, y);
        await stepAndRender();
    });
});

//keyboard controls
window.addEventListener('keydown', async (event) => {
    let x = 0, y = 0;
    switch(event.key) {
     case 'ArrowUp': y = -1; break;
     case 'ArrowDown': y = 1; break;
     case 'ArrowLeft': x = -1; break;
     case 'ArrowRight': x = 1; break;
     default: return;
    }
    event.preventDefault();
    await sendDirection(x, y);
    await stepAndRender();
});

setInterval(stepAndRender, 900);

fetchAndRender();