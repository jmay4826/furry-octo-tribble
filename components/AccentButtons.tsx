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
    <style jsx>{`
      .accent-button {
        background: none;
        border: 1px solid #e5e9f2;
        border-radius: 6px;
        padding: 10px 15px;
        margin: 5px;
        color: #7545ab;
        font-weight: 700;
      }
      .accent-button:hover {
        border: 1px solid #e5e9f2;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
    `}</style>
  </div>
);

export { AccentButtons };
