import { FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IQRCodeFormProps } from "../../QRCodeFormSelector";

export const EmailForm = ({ setURL, hidden }: IQRCodeFormProps) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!hidden) setURL(`mailto:${email}?subject=${subject}&body=${body}`);
  }, [setURL, hidden, email, subject, body]);

  return (
    <FormControl style={{ display: hidden ? "none" : "" }}>
      <TextField
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Subject"
        variant="filled"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <TextField
        label="Body"
        variant="filled"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </FormControl>
  );
};
