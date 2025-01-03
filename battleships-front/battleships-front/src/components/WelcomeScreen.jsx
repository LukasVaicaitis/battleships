import { Box, Text, Button, TextInput } from "@mantine/core";
import { startGame } from "../api/api";

const WelcomeScreen = ({ playerName, setPlayerName, setIsGameStarted, setGuessBoard }) => {
    const handleStartGame = async () => {
        try {
            // Išvalome išsaugotą gameId, jei toks yra
            localStorage.clear("gameId");

            // API funkcija pradeti žaidimui
            const { gameId } = await startGame();

            // Saugomas žaidėjo vardas ir žaidimo ID
            localStorage.setItem("playerName", playerName);
            localStorage.setItem("gameId", gameId);

            // Nustatome būseną su gautais duomenimis
            setGuessBoard(Array(10).fill(null).map(() => Array(10).fill(null)));
            setIsGameStarted(true);

            console.log("Žaidimo ID: " + gameId);

            // //Test
            // //==================
            // const boardGrid = [];

            // while (board.length) {
            //     boardGrid.push(board.splice(0, 10));//Po 10 elementu
            // }
            // boardGrid.forEach((row) => {
            //     console.log(row.map(cell => cell).join(" "));
            // });
            // //==================

        } catch (error) {
            console.error("Klaida pradedant žaidimą:", error);
            alert("Nepavyko pradėti žaidimo. Bandykite dar kartą.");
        }
    };

    return (
        <Box
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
            }}
        >
            {/* žaidimo pavadinimas */}
            <Text
                size={75}
                weight={700}
                style={{ position: "absolute", color: "white", marginBottom: "10px" }}
            >
                Žaidimas Laivų Mūšis
            </Text>

            {/* Naudotojo vardo įvedimo laukas */}
            <TextInput
                placeholder="Įveskite savo vardą"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{ width: "300px", marginTop: "200px", marginBottom: "16px" }}
            />

            {/* Mygtukas žaidimui pradėti */}
            <Button
                color="blue"
                onClick={handleStartGame}
                disabled={!playerName.trim()}
            >
                Pradėti
            </Button>
        </Box>
    );
};

export default WelcomeScreen;