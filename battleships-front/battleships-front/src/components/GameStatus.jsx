import React from "react";
import { Box, Text, Button } from "@mantine/core";

const GameStatus = ({ gameOutcome, restartGame }) => (
    <Box
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
        }}
    >
        <Text size="xl" weight={700} style={{ color: "white", marginBottom: "16px" }}>
            {gameOutcome === "victory" ? "Laimėjote!" : "Baigėsi šūvių skaičius! Bandykite dar kartą!"}
        </Text>
        <Button color="blue" onClick={restartGame}>
            Bandyti dar kartą
        </Button>
    </Box>
);

export default GameStatus;