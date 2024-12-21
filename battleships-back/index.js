const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Serverių sąrašas apkrovos balansavimui
const servers = [
    "http://127.0.0.1:8081",
    "http://127.0.0.1:8082",
    "http://127.0.0.1:8083",
    "http://127.0.0.1:8084",
];

// Žaidimų ir serverių žemėlapis
const gameToServerMap = {}; // Priskiria gameId konkrečiam serveriui

// RR indeksas
let roundRobinIndex = 0;

// Funkcija serverio pasirinkimui pagal round-robin strategiją
function getServerRoundRobin() {
    const server = servers[roundRobinIndex];
    roundRobinIndex = (roundRobinIndex + 1) % servers.length; // Persijungia prie kito serverio sąraše
    return server;
}

// Funkcija serverio pasirinkimui pagal žaidimo ID
function getServerForGame(gameId) {
    return gameToServerMap[gameId] || null; // Grąžina serverį, jei jis yra susietas su žaidimu
}

// Vidurinė grandis užklausų nukreipimui į tinkamus serverius
app.use(async (req, res) => {
    const gameId = req.body?.gameId;
    let server;

    if (gameId) {
        // Jei yra žaidimo ID, nukreipiama pagal žemėlapį
        server = getServerForGame(gameId);
        if (!server) {
            return res.status(404).send("Žaidimas nerastas.");
        }
    } else {
        // Jei nėra žaidimo ID, naudojama round-robin strategija
        server = getServerRoundRobin();
    }

    const forwardedUrl = `${server}${req.url}`; // Sukuriamas tikslinis URL

    try {
        // Užklausa persiunčiama pasirinktam serveriui
        const response = await axios({
            method: req.method,
            url: forwardedUrl,
            data: req.body,
            headers: req.headers,
        });

        // Naujo žaidimo ID (jei toks grąžintas iš serverio)
        const newGameId = response?.data?.gameId;
        if (newGameId && !gameToServerMap[newGameId]) {
            gameToServerMap[newGameId] = server; // Priskiriamas naujas žaidimo ID
            console.log(`Žaidimo ID "${newGameId}" susietas su serveriu "${server}"`);
        }

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(`Klaida persiunčiant užklausą į serverį ${server}:`, error.message);
        res.status(500).send(`Nepavyko prisijungti prie serverio: ${server}`);
    }
});

app.listen(PORT, () => {
    console.log(`Apkrovos balansavimo serveris veikia ant ${PORT} porto`);
});