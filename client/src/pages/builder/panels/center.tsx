import { Box } from "@mantine/core";

export default function CenterPanel() {
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
        this is center panel
      </Box>
    </Box>
  );
}
