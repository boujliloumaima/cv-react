import { useState } from "react";
import {
  Grid,
  Box,
  Drawer,
  Button,
  useMantineTheme,
  Affix,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconGripVertical, IconUser } from "@tabler/icons-react";
import { Resizable } from "re-resizable";

export default function ThreePaneLayout({
  leftContent,
  middleContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  middleContent: React.ReactNode;
  rightContent: React.ReactNode;
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(500);

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <Box
      style={{
        display: "flex",
        height: "100vh",
        border: "1px solid #ddd",
      }}
    >
      {/* Left Panel */}
      {!isMobile ? (
        <Resizable
          size={{ width: leftWidth, height: "100%" }}
          onResizeStop={(e, direction, ref, d) => {
            setLeftWidth(leftWidth + d.width);
          }}
          enable={{ right: true }}
          style={{
            borderRight: "5px solid #ddd",
            background: "white",
            position: "relative", // stays in normal flow
            zIndex: 2,
            padding: "0rem",
          }}
          handleComponent={{
            right: (
              <div className="resize-handle">
                <IconGripVertical size={16} />
              </div>
            ),
          }}
          handleStyles={{
            right: {
              width: "6px",
              cursor: "ew-resize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Box p="md" style={{ height: "100%" }}>
            {leftContent}
          </Box>
        </Resizable>
      ) : (
        <Drawer
          opened={leftOpen}
          onClose={() => setLeftOpen(false)}
          title="Left Panel"
          size="md"
          position="left"
        >
          {leftContent}
        </Drawer>
      )}

      {/* Middle (auto grows, stays in the center) */}
      <Box
        style={{
          flex: 1, // take remaining space
          borderLeft: "1px solid #ddd",
          borderRight: "1px solid #ddd",
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {middleContent}
      </Box>

      {/* Right Panel */}
      {!isMobile ? (
        <Resizable
          size={{ width: rightWidth, height: "100%" }}
          onResizeStop={(e, direction, ref, d) => {
            setRightWidth(rightWidth + d.width);
          }}
          enable={{ left: true }}
          style={{
            borderLeft: "5px solid #ddd",
            background: "white",
            position: "relative", // stays in normal flow
            zIndex: 2,
          }}
          handleComponent={{
            left: (
              <div className="resize-handle">
                <IconGripVertical size={16} />
              </div>
            ),
          }}
          handleStyles={{
            left: {
              width: "6px",
              cursor: "ew-resize",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
          }}
        >
          <Box p="md" style={{ height: "100%" }}>
            {rightContent}
          </Box>
        </Resizable>
      ) : (
        <Drawer
          opened={rightOpen}
          onClose={() => setRightOpen(false)}
          title="Right Panel"
          size="md"
          position="right"
        >
          {rightContent}
        </Drawer>
      )}

      {/* Floating Buttons for Mobile */}
      {isMobile && (
        <>
          {/* Left Panel Button (Center-Left) */}
          {!leftOpen && (
            <Affix
              position={{ left: 0, top: "50%" }}
              style={{ transform: "translateY(-50%)" }}
            >
              <Button onClick={() => setLeftOpen(!leftOpen)}>
                <IconGripVertical size={16} />
              </Button>
            </Affix>
          )}

          {/* Right Panel Button (Center-Right) */}
          {!rightOpen && (
            <Affix
              position={{ right: 0, top: "50%" }}
              style={{ transform: "translateY(-50%)" }}
            >
              <Button onClick={() => setRightOpen(!rightOpen)}>
                <IconGripVertical size={16} />
              </Button>
            </Affix>
          )}
        </>
      )}
    </Box>
  );
}
