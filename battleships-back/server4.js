const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { generateGame, processMove } = require("./gameLogic");

const app = express();
const PORT = 8084; // Serverio portas

//Zaidimo išsaugojimas
const games = {};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Pradėti naują žaidimą
app.post("/start", (req, res) => {
    const gameId = Math.random().toString(36).slice(2, 11); // Unikalus žaidimo ID
    const game = generateGame(); // Sukuria naują lentą ir laivus
    games[gameId] = game; // Išsaugoma atmintyje

    res.json({ gameId, board: game.board }); // Grąžina žaidimo ID ir lentą
});

// Apdoroti žaidėjo ėjimą
app.post("/move", (req, res) => {
    const { gameId, x, y } = req.body;

    const game = games[gameId];
    if (!game) return res.status(404).json({ message: "Žaidimas nerastas" });

    const result = processMove(game, x, y);
    res.json(result);
});

// Sveikatos tikrinimas
app.get("/health", (req, res) => {
    res.status(200).send("Serveris sveikas!");
});

app.listen(PORT, () => console.log(`Serveris 1 veikia ant ${PORT} porto`));