import { copyImageToClipboard } from "copy-image-clipboard";
import { toPng } from "html-to-image";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import { QRCodeWrapper } from "./styles/QRCodeWrapper";
import { generateQRCode, getNeighbors } from "./utils/qrcode";

export interface IQRCode {
  url: string;
  correction: ErrorCorrectionLevel;
}

export const QRCode = ({ url, correction }: IQRCode) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = generateQRCode(url, correction);

  const { enqueueSnackbar } = useSnackbar();

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

  return (
    <QRCodeWrapper ref={ref} onClick={handleOnClick} size={qrCode?.length}>
      {qrCode?.map((segment, i) =>
        segment.map((char, j) => {
          const {
            northNeighbor,
            southNeighbor,
            eastNeighbor,
            westNeighbor,
            neighborNum,
          } = getNeighbors(i, j, qrCode);

          let style: React.CSSProperties = {
            backgroundColor: "rgba(255,255,255,.4)",
            gridArea: `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`,
            borderRadius: "0px",
          };

          if (neighborNum === 0) {
            style.borderRadius = "50%";
            style.transform = "scale(0.8)";
          }

          if (neighborNum === 1) {
            if (northNeighbor) {
              style.borderRadius = "0 0 50% 50%";
            }
            if (southNeighbor) {
              style.borderRadius = "50% 50% 0 0";
            }
            if (westNeighbor) {
              style.borderRadius = "0 50% 50% 0";
            }
            if (eastNeighbor) {
              style.borderRadius = "50% 0 0 50%";
            }
          }

          if (neighborNum === 2) {
            if (northNeighbor && eastNeighbor) {
              style.borderRadius = "0 0 0 50%";
            }
            if (northNeighbor && westNeighbor) {
              style.borderRadius = "0 0 50% 0";
            }

            if (southNeighbor && eastNeighbor) {
              style.borderRadius = "50% 0 0 0";
            }
            if (southNeighbor && westNeighbor) {
              style.borderRadius = "0 50% 0 0";
            }
          }

          return char && <div key={`${i}-${j}`} style={style} />;
        })
      )}
    </QRCodeWrapper>
  );
};
