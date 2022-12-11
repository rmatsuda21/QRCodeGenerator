import { useEffect, useRef, useState } from "react";
import { styled, TextField, useTheme } from "@mui/material";
import { copyImageToClipboard } from "copy-image-clipboard";
import { toPng } from "html-to-image";
import { useSnackbar } from "notistack";
import qrcode from "qrcode-generator";

const QRCodeWrapper = styled("div", {
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

function App() {
  const [qrCode, setQrCode] = useState<boolean[][]>();
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const code = qrcode(0, "Q");
    code.addData(text);
    code.make();
    const count = code.getModuleCount();
    const grid = new Array(count)
      .fill(false)
      .map((_, indx) =>
        new Array(count).fill(false).map((_, indx2) => code.isDark(indx, indx2))
      );

    setQrCode(grid);
  }, [text]);

  const handleOnClick = () => {
    toPng(ref?.current as HTMLElement).then((dataUrl) => {
      copyImageToClipboard(dataUrl)
        .then(() => {
          enqueueSnackbar("Copied to clipboard", {
            variant: "success",
            autoHideDuration: 1500,
          });
        })
        .catch((err) => {
          enqueueSnackbar(String(err), {
            variant: "error",
            autoHideDuration: 1500,
          });
        });
    });
  };

  const convertedQrCode = (
    <QRCodeWrapper ref={ref} onClick={handleOnClick} size={qrCode?.length}>
      {qrCode?.map((segment, i) =>
        segment.map(
          (char, j) =>
            char && (
              <div
                key={`${i}-${j}`}
                style={{
                  backgroundColor: "rgba(255,255,255,.4)",
                  gridArea: `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`,
                  borderRadius: 10,
                }}
              />
            )
        )
      )}
    </QRCodeWrapper>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {convertedQrCode}
      <TextField
        style={{ width: "max(25%, 300px)" }}
        label="Text"
        variant="filled"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <Button variant="contained" onClick={handleOnClick}>
        Copy to Clipboard
      </Button> */}
    </div>
  );
}

export default App;
