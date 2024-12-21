import React from "react";
import { Box, Text, Button } from "@mantine/core";

const Header = ({ playerName, shotsRemaining, onReset }) => (
    <>
        {/* Žaidėjo vardas */}
        <Box
            style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                zIndex: 10,
            }}
        >
            <Text size="lg" weight={700}>
                Žaidėjas: {playerName}
            </Text>
        </Box>

        {/* Likęs šūvių skaičius */}
        <Text
            size={100}
            weight={700}
            align="center"
            style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 5,
                color: "black",
                pointerEvents: "none",
            }}
        >
            {shotsRemaining}
        </Text>

        {/* Bandyti is naujo mygtukas */}
        <Box
            style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 10,
            }}
        >
            <Button onClick={onReset}>Pradėti iš naujo</Button>
        </Box>
    </>
);

export default Header;