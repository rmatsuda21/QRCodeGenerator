import { Container, Paper, Tab, Tabs } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { EmailForm } from "./components/forms/EmailForm";
import { TextForm } from "./components/forms/TextForm";
import { URLForm } from "./components/forms/URLForm";

export interface IQRCodeFormSelectorProps {
  url: string;
  setURL: Dispatch<SetStateAction<string>>;
}

export interface IQRCodeFormProps extends IQRCodeFormSelectorProps {
  hidden: boolean;
}

export const QRCodeFormSelector = (props: IQRCodeFormSelectorProps) => {
  const [value, setValue] = useState(0);

  const handleOnChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Tabs value={value} onChange={handleOnChange}>
        <Tab label="Link" value={0} />
        <Tab label="E-mail" value={1} />
        <Tab label="Text" value={2} />
      </Tabs>
      <Paper sx={{ padding: 2 }}>
        <URLForm {...props} hidden={value !== 0} />
        <EmailForm {...props} hidden={value !== 1} />
        <TextForm {...props} hidden={value !== 2} />
      </Paper>
    </Container>
  );
};
