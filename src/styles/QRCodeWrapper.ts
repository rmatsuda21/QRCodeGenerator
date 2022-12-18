import { Box, styled } from "@mui/material";
import { Container } from "@mui/system";

export const QRCodeWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "size",
})<{ size?: number }>(({ theme, size }) => {
  return `
  background-color: ${theme.palette.background.default};
  display: grid;
  grid-template-columns: repeat(${size || 0}, 1fr);
  grid-template-rows: repeat(${size || 0}, 1fr);
  width: max(30vw, 300px);
  aspect-ratio: 1 / 1;
  padding: 20px;
  border-radius: 20px;
  border: 5px solid rgba(255, 255, 255, 0.08);

  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.07);
    border: 5px solid rgba(255, 255, 255, 0.2);
    transform: scale(1.007);
  }
`;
});

export const CenteredDiv = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CenteredBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
