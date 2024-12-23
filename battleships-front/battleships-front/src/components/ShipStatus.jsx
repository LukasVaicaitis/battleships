import { Box, Text, Stack } from "@mantine/core";

const ShipStatus = ({ sunkShips, shipCounts }) => {
    const sunkShipCounts = {
        size1: 0,
        size2: 0,
        size3: 0,
        size4: 0,
        size5: 0,
    };

    // Iteruojama per nuskandintus laivus ir skaiciuojami kiekvieno dydžio nuskandinti laivai
    Object.values(sunkShips).forEach((ship) => {
        if (ship.hits >= ship.size) {
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
                    const sunkCount = sunkShipCounts[`size${size}`] || 0; // Nuskandintų laivų skaičius pagal dydį
                    const remainingCount = shipCounts[`size${size}`] - sunkCount; // Likę nenuskandinti laivai pagal dydį

                    // Keiciamas raktas pagal likusiu laivu dydi, kad butu galima kelis kartus naudoti ta pacia animacija
                    return (
                        <Box key={`${size}-${remainingCount}`}>
                            <Box
                                style={{
                                    display: "flex",
                                    alignItems: "left",
                                    position: "relative",
                                    animation:
                                        remainingCount !== shipCounts[`size${size}`] ? "shake 0.5s ease-in-out" : "none",
                                }}
                            >
                                <Box style={{ display: "flex", marginRight: "10px" }}>
                                    {/* Laivų atvaizdavimas kvadratais */}
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
                                <Text
                                    style={{
                                        fontWeight: remainingCount === 0 ? "bold" : "normal",
                                        animation:
                                            remainingCount !== shipCounts[`size${size}`] ? "shake 0.5s ease-in-out" : "none", // Animacijos aktyvavimas pagal pasikeitusį skaičių
                                    }}
                                >
                                    {remainingCount === 0
                                        ? "Visi laivai nuskandinti"
                                        : `${remainingCount} ${remainingCount === 1 ? "Laivas" : "Laivai"}`}
                                </Text>
                            </Box>
                        </Box>
                    );
                })}
            </Stack>

            {/* CSS animacija */}
            <style>
                {`
                @keyframes shake {
                    0% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }
                `}
            </style>
        </Box>
    );
};

export default ShipStatus;