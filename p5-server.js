import express from 'express';
import { getGameState, updateDirection, stepGame } from './p5-game.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/state', (req, res) => {
    res.json(getGameState());
});


app.get('/api/step', (req, res) => {    
    stepGame();  
    res.json(getGameState());
}); 

/*app.get('/api/step', (req, res) => {
    try {
        stepGame();
        const gameState = getGameState();
        res.json(gameState); 
    } catch (error) {
        console.error('Error in /api/step:', error);
        res.status(500).json({ error: 'Server error' });
    }
});*/


app.post('/api/direction', (req, res) => {
    const { x, y } = req.body;

    if (
        typeof x === 'number' &&
        typeof y === 'number' &&
        (Math.abs(x) + Math.abs(y) === 1)
    ) {
        updateDirection(x, y);
        res.json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'Invalid direction' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});