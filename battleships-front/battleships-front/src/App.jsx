import React, { useState, useEffect } from "react";
import { Box, Flex, Transition } from "@mantine/core";
import WelcomeScreen from "./components/WelcomeScreen";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import Header from "./components/Header";
import ShipStatus from "./components/ShipStatus";
import { makeMove } from "./api/api";

function App() {
  // Būsenos valdymas
  const [shotsRemaining, setShotsRemaining] = useState(25); // šūvių likutis

  const [shipCounts, setShipCounts] = useState({ size1: 3, size2: 3, size3: 2, size4: 1, size5: 1 }); // Laivų skaičius pagal dydį
  const [sunkShips, setSunkShips] = useState({ size1: 0, size2: 0, size3: 0, size4: 0, size5: 0 }); // Nuskandinti laivai

  const [realBoard, setRealBoard] = useState(
    Array(10).fill(null).map(() => Array(10).fill(null))
  ); // Tikroji (paslėpta) žaidimo lenta
  const [guessBoard, setGuessBoard] = useState(
    Array(10).fill(null).map(() => Array(10).fill(null))
  ); // Žaidėjo spėjimų lenta

  const [playerName, setPlayerName] = useState(""); // Žaidėjo vardas
  const [isGameStarted, setIsGameStarted] = useState(false); // Ar žaidimas prasidėjo
  const [gameOutcome, setGameOutcome] = useState(""); // Žaidimo rezultatas ("pergalė", "pralaimėjimas" arba "")
  const [gameId, setGameId] = useState(""); // Žaidimo ID

  // Paimamas žaidėjo vardas iš vietinės atminties
  useEffect(() => {
    const storedName = localStorage.getItem("playerName");
    if (storedName) {
      setPlayerName(storedName);
      setIsGameStarted(false);
    }
  }, []);

  // Tikrinama, ar baigėsi šūviai
  useEffect(() => {
    if (shotsRemaining === 0 && !gameOutcome) {
      setGameOutcome("defeat");
    }
  }, [shotsRemaining, gameOutcome]);

  // Valdymas paspaudžiant ant lentos langelio
  const handleCellClick = async (row, col) => {
    if (guessBoard[row][col] === null && shotsRemaining > 0 && isGameStarted) {
      try {
        // Vykdoma ejimo funkcija API faile
        const result = await makeMove(localStorage.getItem("gameId"), row, col);

        if (!result) {
          alert("Nepavyko atlikti ėjimo. Bandykite dar kartą.");
          return;
        }

        // Išrenkami kintamieji iš atsakymo
        const { result: moveResult, board, sunkShips, gameStatus } = result;

        // Atnaujiname spėjimų lentą pagal rezultatą
        setGuessBoard((prevGuessBoard) => {
          const newBoard = prevGuessBoard;
          newBoard[row][col] = moveResult === "hit" ? "X" : "O"; // X - pataikymas
          return newBoard;
        });

        setRealBoard(board);
        setSunkShips(sunkShips);

        if (moveResult === "miss") {
          setShotsRemaining((prev) => prev - 1);
        }

        // Tikrinama zaidimo būsena
        if (gameStatus === "victory") {
          setGameOutcome("victory");
        } else if (gameStatus === "defeat") {
          setGameOutcome("defeat");
        }
      } catch (error) {
        console.error("Klaida atliekant ėjimą:", error);
        alert("Klaida atliekant ėjimą. Bandykite dar kartą.");
      }
    }
  };

  // Žaidimo atstatymo funkcija
  const resetGame = () => {
    setShotsRemaining(25);
    setRealBoard(Array(10).fill(null).map(() => Array(10).fill(null)));
    setGuessBoard(Array(10).fill(null).map(() => Array(10).fill(null)));
    setGameOutcome("");
    setIsGameStarted(false);
    setGameId("");

    setShipCounts({ size1: 3, size2: 3, size3: 2, size4: 1, size5: 1 });
    setSunkShips({ size1: 0, size2: 0, size3: 0, size4: 0, size5: 0 });
  };

  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(135deg,rgb(161, 161, 161),rgb(255, 255, 255))",
      }}
    >
      {/* Pasveikinimo ekranas */}
      <Transition
        mounted={!isGameStarted && !gameOutcome}
        transition="fade"
        duration={500}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Box style={{ ...styles, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <WelcomeScreen
              playerName={playerName}
              setPlayerName={setPlayerName}
              setIsGameStarted={setIsGameStarted}
              setGameId={setGameId}
              setRealBoard={setRealBoard}
              setGuessBoard={setGuessBoard}
            />
          </Box>
        )}
      </Transition>

      {/* Žaidimo pagrindinė sąsaja */}
      {isGameStarted && !gameOutcome && (
        <>
          <Header
            playerName={playerName}
            shotsRemaining={shotsRemaining}
            onReset={resetGame}
          />
          <Flex style={{ justifyContent: "center", width: "100%" }}>
            <Box style={{ marginRight: "20px", marginTop: "80px" }}>
              <GameBoard
                guessBoard={guessBoard}
                handleCellClick={handleCellClick}
                shotsRemaining={shotsRemaining}
                isGameStarted={isGameStarted}
                gameOutcome={gameOutcome}
              />
            </Box>
            <Box style={{ marginLeft: "20px", marginTop: "100px", width: "250px" }}>
              <ShipStatus sunkShips={sunkShips} shipCounts={shipCounts} />
            </Box>
          </Flex>
        </>
      )}

      {/* Žaidimo pabaigos ekranas */}
      <Transition
        mounted={!!gameOutcome}
        transition="fade"
        duration={500}
        timingFunction="ease-in-out"
      >
        {(styles) => (
          <Box style={{ ...styles, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <GameStatus gameOutcome={gameOutcome} restartGame={resetGame} />
          </Box>
        )}
      </Transition>
    </Box>
  );
}

export default App;