// Sukuria naują žaidimo lentą ir išdėsto laivus
function generateGame() {
    const board = Array(10).fill(null).map(() => Array(10).fill(null)); // 10x10 lenta
    const ships = [
        { size: 5, count: 1 },
        { size: 4, count: 1 },
        { size: 3, count: 2 },
        { size: 2, count: 3 },
        { size: 1, count: 3 },
    ];

    const placedShips = [];

    function isValidCell(r, c) {
        return r >= 0 && r < 10 && c >= 0 && c < 10;
    }

    function isPlacementValid(shipCells) {
        return shipCells.every(([r, c]) => {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const adjRow = r + dr;
                    const adjCol = c + dc;
                    if (isValidCell(adjRow, adjCol) && board[adjRow][adjCol] !== null) {
                        return false;
                    }
                }
            }
            return true;
        });
    }

    function placeShip(size) {
        while (true) {
            const horizontal = Math.random() < 0.5;
            const row = Math.floor(Math.random() * (horizontal ? 10 : 10 - size));
            const col = Math.floor(Math.random() * (horizontal ? 10 - size : 10));
            const shipCells = Array.from({ length: size }, (_, i) => [
                row + (horizontal ? 0 : i),
                col + (horizontal ? i : 0),
            ]);

            if (isPlacementValid(shipCells)) {
                shipCells.forEach(([r, c]) => (board[r][c] = size));
                placedShips.push({ size, cells: shipCells, hits: 0 });
                break;
            }
        }
    }

    ships.forEach(({ size, count }) => {
        for (let i = 0; i < count; i++) placeShip(size);
    });

    const sunkShips = Object.fromEntries(
        placedShips.map((ship, index) => [index, { size: ship.size, hits: 0 }])
    );

    return { board, placedShips, sunkShips };
}

// Apdoroja žaidėjo ėjimą (pataikymą, pralaimėjimą arbA pergalę)
function processMove(game, x, y) {
    const { board, sunkShips, placedShips } = game;

    if (board[x][y] === null) {
        return { result: "miss", sunkShips, gameStatus: "ongoing" };
    }

    board[x][y] = "X"; // Pažymima kaip pataikyta

    const shipIndex = placedShips.findIndex((ship) =>
        ship.cells.some(([r, c]) => r === x && c === y)
    );
    const ship = placedShips[shipIndex];

    sunkShips[shipIndex].hits++;

    const allHits = ship.cells.filter(([r, c]) => board[r][c] === "X").length;
    if (allHits === ship.size) {
        sunkShips[shipIndex].hits = ship.size; // Laivas nuskandintas
    }

    const allShipsSunk = Object.values(sunkShips).every(
        (ship) => ship.hits === ship.size
    );

    const gameStatus = allShipsSunk ? "victory" : "ongoing";

    return { result: "hit", sunkShips, gameStatus };
}

module.exports = { generateGame, processMove };