import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IQRCodeFormProps } from "../../QRCodeFormSelector";

export const TextForm = ({ hidden, setURL }: IQRCodeFormProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!hidden) setURL(text);
  }, [setURL, text, hidden]);

  return (
    <TextField
      style={{ width: "max(25%, 300px)", display: hidden ? "none" : "" }}
      label={
        <>
          <FontAwesomeIcon icon={faQuoteLeft} /> Text
        </>
      }
      variant="filled"
      value={text}
      onChange={(e) => setText(e.target.value)}
      multiline
      maxRows={5}
    />
  );
};
