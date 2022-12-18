import qrcode from "qrcode-generator";

export const generateQRCode = (
  url: string,
  correction: ErrorCorrectionLevel
) => {
  const code = qrcode(0, correction);
  code.addData(url);
  code.make();
  const count = code.getModuleCount();
  const grid = new Array(count)
    .fill(false)
    .map((_, indx) =>
      new Array(count).fill(false).map((_, indx2) => code.isDark(indx, indx2))
    );

  return grid;
};

export const getNeighbors = (y: number, x: number, qrCode: boolean[][]) => {
  const northNeighbor = y > 0 && qrCode[y - 1][x];
  const southNeighbor = y < qrCode.length - 1 && qrCode[y + 1][x];
  const eastNeighbor = x < qrCode.length - 1 && qrCode[y][x + 1];
  const westNeighbor = x > 0 && qrCode[y][x - 1];

  const neighborNum =
    Number(northNeighbor) +
    Number(southNeighbor) +
    Number(eastNeighbor) +
    Number(westNeighbor);

  return {
    northNeighbor,
    southNeighbor,
    eastNeighbor,
    westNeighbor,
    neighborNum,
  };
};
