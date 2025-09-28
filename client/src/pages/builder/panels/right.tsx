import { Box } from "@mantine/core";

export default function RightPanel() {
  return (
    <Box
      style={{
        width: "100%",
        borderRight: "1px solid #ddd",

        background: "white",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box p="md" style={{ height: "100%" }}>
        this is right panel
      </Box>
    </Box>
  );
}
