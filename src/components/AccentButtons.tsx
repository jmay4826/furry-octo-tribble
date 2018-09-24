import Button from "@material-ui/core/Button";
import * as React from "react";

const originalCaps: React.CSSProperties = { textTransform: "initial" };

export const defaultAccents = {
  "!": "¡",
  "?": "¿",
  A: "Á",
  E: "É",
  I: "Í",
  N: "Ñ",
  O: "Ó",
  U: "Ú",
  a: "á",
  e: "é",
  i: "í",
  n: "ñ",
  o: "ó",
  u: "ú"
};

const AccentButtons = ({
  handleClick,
  accents = defaultAccents
}: {
  handleClick: React.MouseEventHandler;
  accents?: { [key: string]: string };
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      maxWidth: "80%"
    }}
  >
    {Object.keys(accents).map(char => (
      <Button
        key={char}
        style={originalCaps}
        onClick={handleClick}
        name={accents[char]}
      >
        {accents[char]}
      </Button>
    ))}
  </div>
);

export { AccentButtons };
