import * as React from "react";

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
  <div className="accent-container">
    {Object.keys(accents).map(char => (
      <button
        key={char}
        className="accent-button"
        onClick={handleClick}
        name={accents[char]}
      >
        {accents[char]}
      </button>
    ))}
  </div>
);

export { AccentButtons };
