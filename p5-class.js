/*
    CIT 281 Project 5
    Name: Arissa Samaniego
*/

class Snake {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.body = [{ x: 10, y: 10}];
        this.direction = { x: 1, y: 0};
        this.grow = false;
    }

    setDirection(x, y) { 
        if (x === -this.direction.x && y === -this.direction.y) return;
        this.direction = { x, y};
    }

    move() {
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y,
        };
        this.body.unshift(newHead);

        if (!this.grow) {
            this.body.pop();
        } else {
            this.grow = false;
        }
     }
    

    eat (food) {
        const [head] = this.body;
        return head.x === food.position.x && head.y === food.position.y; 
    }

    checkCollision() {
        const [head, ...rest] = this.body;
        // check wall collision
        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= this.gridSize ||
            head.y >= this.gridSize
        ) {
            return true;
        }
        return rest.some(segment => segment.x === head.x && segment.y === head.y);
    }
}

class Food {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.position = this.randomPosition();
    }

    randomPosition () {
        return {
            x: Math.floor(Math.random() * this.gridSize),
            y: Math.floor(Math.random() * this.gridSize),
        };
    }

    respawn(snakeBody) {
        let newPos;
        do {
            newPos = this.randomPosition();
        } while (snakeBody.some(segment => segment.x === newPos.x && segment.y === newPos.y));
        this.position = newPos;
    }
}

export { Snake, Food};
