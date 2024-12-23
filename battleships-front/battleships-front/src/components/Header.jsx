import { Box, Text, Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const Header = ({ playerName, shotsRemaining, onReset }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
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

            {/* headerio mygtukai */}
            <Box
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 10,
                    display: "flex",
                    gap: "10px",
                }}
            >
                {/* "Kaip žaisti mygtukas */}
                <Button variant="outline" onClick={open}>
                    Kaip žaisti?
                </Button>

                {/* "Pradėti iš naujo mygtukas */}
                <Button onClick={onReset}>Pradėti iš naujo</Button>
            </Box>

            {/* Modal elementas su instrukcija */}
            <Modal opened={opened} onClose={close} title="Kaip žaisti Laivų mūšį?">
                <Stack spacing="sm">
                    <Text>
                        <strong>1. Žaidimo tikslas:</strong> nuskandinti priešo laivus.
                    </Text>
                    <Text>
                        <strong>2. Žaidėjas</strong> turi 25 šūvius, kad pataikytų į atsitiktinai išdėstytus laivus. Pataikius į laivą tas šūvis nėra atimamas.
                    </Text>
                    <Text>
                        <strong>3. Laivų dydžiai:</strong> iš viso yra 10 skirtingo dydžio laivų.
                    </Text>
                    <Text>
                        <strong>4. Taisyklės:</strong> pataikius langelis nusidažo raudona spalva, nepataikius - mėlyna.
                    </Text>
                    <Text>
                        <strong>5. Žaidimas yra laimimas, </strong> kuomet yra nuskandinami visi priešo laivai nepasibaigus turimiems šūviams.
                    </Text>
                    <Text>
                        <strong>Sėkmės! </strong>
                    </Text>
                </Stack>
            </Modal>
        </>
    );
};

export default Header;