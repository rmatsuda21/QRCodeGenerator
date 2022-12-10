import { useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { copyImageToClipboard } from "copy-image-clipboard";
import { Button, Input, TextField, useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import styled from "@emotion/styled";

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

  const qrCodeString =
    qrCode &&
    qrCode.map((segment) =>
      segment.map((char) => (char ? "⬛" : "⬜️")).join("")
    );

  console.log(qrCode);

  const handleOnClick = () => {
    toJpeg(ref?.current as HTMLElement).then((dataUrl) => {
      copyImageToClipboard(dataUrl);
      enqueueSnackbar("Copied to clipboard", {
        variant: "success",
        autoHideDuration: 1500,
      });
    });
  };

  const QRCodeWrapper = styled.div`
    background-color: ${theme.palette.background.default};
    display: grid;
    grid-template-columns: repeat(${qrCode?.length || 0}, 1fr);
    grid-template-rows: repeat(${qrCode?.length || 0}, 1fr);
    width: 500px;
    height: 500px;
    padding: 20px;
    border-radius: 20px;
    outline: 5px solid rgba(255, 255, 255, 0.08);

    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.07);
      outline: 5px solid rgba(255, 255, 255, 0.2);
      transform: scale(1.007);
    }
  `;
  const convertedQrCode = (
    <QRCodeWrapper ref={ref} onClick={handleOnClick}>
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
        style={{ width: "25%" }}
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
