import React from "react";
import { Box, Text } from "@mantine/core";

const GameBoard = ({
    guessBoard,
    handleCellClick,
    isGameStarted,
    gameOutcome,
}) => {
    const columnLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rowLabels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    return (
        <Box
            style={{
                display: "grid",
                gridTemplateColumns: "50px repeat(10, 50px)",
                gridTemplateRows: "50px repeat(10, 50px)",
                gap: "4px",
            }}
        >
            {/* Tuscias kvadratas kaireje virsuje */}
            <Box></Box>
            {/* Stulpeliu pavadinimai */}
            {columnLabels.map((label) => (
                <Box
                    key={label}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "50px",
                        backgroundColor: "#ccc",
                        fontWeight: "bold",
                    }}
                >
                    <Text>{label}</Text>
                </Box>
            ))}

            {/* Eiliciu pavadinimai */}
            {rowLabels.map((label, rowIndex) => (
                <React.Fragment key={`row-${label}`}>
                    <Box
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50px",
                            backgroundColor: "#ccc",
                            fontWeight: "bold",
                        }}
                    >
                        <Text>{label}</Text>
                    </Box>
                    {guessBoard[rowIndex].map((cell, colIndex) => {
                        const isClickable = isGameStarted && !gameOutcome;

                        return (
                            <Box
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor:
                                        cell === null
                                            ? "#e0e0e0" // Empty cell
                                            : cell === "X"
                                                ? "#f03e3e" // Hit cell
                                                : "#90e0ef", // Missed cell
                                    border: "1px solid #ccc",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: isClickable ? "pointer" : "default",
                                }}
                                onClick={() => isClickable && handleCellClick(rowIndex, colIndex)}
                            >
                                {cell}
                            </Box>
                        );
                    })}
                </React.Fragment>
            ))}
        </Box>
    );
};

export default GameBoard;