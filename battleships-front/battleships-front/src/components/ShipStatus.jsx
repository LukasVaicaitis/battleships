import React from "react";
import { Box, Text, Stack } from "@mantine/core";

const ShipStatus = ({ sunkShips, shipCounts }) => {
    // Sukuriamas objektas nuskandintų laivų skaičiui pagal dydį saugoti
    const sunkShipCounts = {
        size1: 0,
        size2: 0,
        size3: 0,
        size4: 0,
        size5: 0,
    };

    // Iteruojame per nuskandintus laivus ir suskaičiuojame kiekvieno dydžio nuskandintus laivus
    Object.values(sunkShips).forEach((ship) => {
        if (ship.hits >= ship.size) {
            // Laivas laikomas nuskandintu, jei pataikymų skaičius yra lygus arba didesnis už jo dydį
            sunkShipCounts[`size${ship.size}`] += 1;
        }
    });

    return (
        <Box>
            <Text size="lg" weight={700} style={{ marginBottom: "16px" }}>
                Likę nenuskandinti laivai:
            </Text>
            <Stack spacing="sm">
                {[1, 2, 3, 4, 5].map((size) => {
                    const sunkCount = sunkShipCounts[`size${size}`] || 0; // Nuskandintų laivų skaičius
                    const remainingCount = shipCounts[`size${size}`] - sunkCount; // Likę nenuskandinti laivai

                    return (
                        <Box key={size}>
                            <Box style={{ display: "flex", alignItems: "left" }}>
                                <Box style={{ display: "flex", marginRight: "10px" }}>
                                    {/* Kuriami kvadratai, kurie reprezentuoja laivo dydį */}
                                    {new Array(size).fill("■").map((_, index) => (
                                        <Box
                                            key={index}
                                            style={{
                                                width: "15px",
                                                height: "15px",
                                                backgroundColor: "#f03e3e",
                                                marginRight: "2px",
                                                opacity: remainingCount > 0 ? 1 : 0.5,
                                            }}
                                        />
                                    ))}
                                </Box>
                                {/* Rodo likusių laivų skaičių */}
                                <Text>
                                    {remainingCount === 0
                                        ? "Visi laivai nuskandinti"
                                        : `${remainingCount} ${remainingCount === 1 ? "Laivas" : "Laivai"}`}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default ShipStatus;