import React from "react";
import { Box, Text } from "@mantine/core";

const ShipsRemaining = ({ size, count, sunk }) => {
    const remaining = count - sunk;
    const shipSquares = new Array(size).fill("■");

    return (
        <Box>
            <Box style={{ display: "flex", alignItems: "left" }}>
                <Box style={{ display: "flex", marginRight: "10px" }}>
                    {/* Kvadrateliai laivo dydziui pavaizduoti */}
                    {shipSquares.map((_, index) => (
                        <Box
                            key={index}
                            style={{
                                width: "15px",
                                height: "15px",
                                backgroundColor: "#f03e3e",
                                marginRight: "2px",
                                opacity: remaining > 0 ? 1 : 0.5,
                            }}
                        />
                    ))}
                </Box>
                {/* Likusių laivų skaičius */}
                <Text>
                    {remaining === 0
                        ? "Visi laivai nuskandinti"
                        : `${remaining} ${remaining === 1 ? "Laivas" : "Laivai"}`}
                </Text>
            </Box>
        </Box>
    );
};

export default ShipsRemaining;