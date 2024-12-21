import axios from "axios";

// Load Balancerio URL
const BASE_URL = "http://localhost:8080";

// Naujo žaidimo užkrovimo funkcija
export const startGame = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/start`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status !== 200) {
            throw new Error("Failed to start game");
        }

        return response.data;
    } catch (error) {
        console.error("Error starting the game:", error);
        throw error;
    }
};

// Spejimo API funkcija
export const makeMove = async (gameId, x, y) => {
    try {
        const response = await axios.post(`${BASE_URL}/move`, {
            gameId,
            x,
            y,
        });

        const moveData = response.data;

        return moveData;
    } catch (error) {
        console.error("Error making the move:", error);
        throw error;
    }
};