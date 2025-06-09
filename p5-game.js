import { Snake, Food } from './p5-class.js';

const gridSize = 20;
const snake = new Snake(gridSize);
const food = new Food(gridSize);
let score = 0;



function stepGame() { 
    snake.move();

    if (snake.eat(food)) {
        snake.grow = true;
        food.respawn(snake.body);
        score += 1;
    }

    if (snake.checkCollision()) {
        resetGame();
    } 
}

// change direction
function updateDirection(x, y) {
    snake.setDirection(x, y);
}

function getGameState() {
    return {
        snake: snake.body.map(({ x, y }) => ({ x, y })),
        food: { ...food.position },
        score,
    };
}

// reset game if game over
function resetGame() {
    snake.body = [{ x: 10, y: 10 }];
    snake.direction = { x: 1, y: 0};
    snake.grow = false;
    food.respawn(snake.body);
    score = 0;
}



export { getGameState, updateDirection, stepGame };