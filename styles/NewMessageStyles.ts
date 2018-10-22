import * as css from "styled-jsx/css";

export const NewMessageStyles = css`
  textarea {
    background: rgba(255, 255, 255, 1);
    border: 1px solid #e5e9f2;
    border-radius: 6px;
    font-size: 1.2em;
    padding: 10px;
    flex-grow: 1;
  }

  .new-message-controls {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 15px;
    margin: 10px 0;
  }

  .new-message-container {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
  }

  .accent-container,
  .send-button {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .send-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .hint {
    align-self: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.9em;
  }
`;
