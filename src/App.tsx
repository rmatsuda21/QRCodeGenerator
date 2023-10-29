import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { vCard } from "vcards-ts";
import { QRCode } from "./QRCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

import { QRCodeFormSelector } from "./QRCodeFormSelector";
import { CenteredBox } from "./styles/QRCodeWrapper";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export interface ICorrectionSelector {
  correction: ErrorCorrectionLevel;
  setCorrection: React.Dispatch<React.SetStateAction<ErrorCorrectionLevel>>;
}

const CorrectionSelector = ({
  correction,
  setCorrection,
}: ICorrectionSelector) => {
  return (
    <FormControl>
      <FormLabel>
        <FontAwesomeIcon icon={faSquareCheck} /> Correction Level
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={correction}
        onChange={(e) => setCorrection(e.target.value as ErrorCorrectionLevel)}
        row
      >
        <FormControlLabel value="L" control={<Radio />} label="Low" />
        <FormControlLabel value="M" control={<Radio />} label="Medium" />
        <FormControlLabel value="Q" control={<Radio />} label="Quartile" />
        <FormControlLabel value="H" control={<Radio />} label="High" />
      </RadioGroup>
    </FormControl>
  );
};

function App() {
  const card = new vCard();
  card.firstName = "Reo";
  card.lastName = "Matsuda";
  card.email = "reo.matsuda@gmail.com";
  // console.log(card.getFormattedString());

  const [url, setURL] = useState(card.getFormattedString());
  const [correction, setCorrection] = useState<ErrorCorrectionLevel>("L");

  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5rem",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CenteredBox sx={{ flexDirection: "column" }}>
        <QRCode url={encodeURI(url)} correction={correction} />
        <Box
          sx={{
            margin: "1rem",
            display: "flex",
            gap: "3rem",
          }}
        >
          <Button
            startIcon={<FontAwesomeIcon icon={faDownload} />}
            size="small"
            variant="contained"
          >
            Save PNG
          </Button>
          <Button
            startIcon={<FontAwesomeIcon icon={faDownload} />}
            size="small"
            variant="contained"
          >
            Save SVG
          </Button>
        </Box>
      </CenteredBox>
      <Box>
        <CorrectionSelector
          correction={correction}
          setCorrection={setCorrection}
        />
        <QRCodeFormSelector url={url} setURL={setURL} />
      </Box>
    </div>
  );
}

export default App;
