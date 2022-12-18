import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IQRCodeFormProps } from "../../QRCodeFormSelector";

export const URLForm = ({ hidden, setURL }: IQRCodeFormProps) => {
  const [partialUrl, setPartialUrl] = useState("");

  useEffect(() => {
    if (!hidden) setURL("https://" + partialUrl);
  }, [setURL, partialUrl, hidden]);

  return (
    <TextField
      style={{ width: "max(25%, 300px)", display: hidden ? "none" : "" }}
      label={
        <>
          <FontAwesomeIcon icon={faLink} /> URL
        </>
      }
      variant="filled"
      value={partialUrl}
      onChange={(e) => setPartialUrl(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">https://</InputAdornment>
        ),
      }}
    />
  );
};
