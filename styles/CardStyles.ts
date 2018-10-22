import * as css from "styled-jsx/css";

export const CardStyles = css`
  .card {
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    transition: background 400ms;
  }

  .card.selected {
    background: #7641ad;
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 0 5px 0 #7641ad;
  }

  .card-header {
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .card-content {
    color: rgba(0, 0, 0, 0.5);
    text-overflow: ellipsis;
    padding: 15px 5px;
    transition: all 400ms;
  }

  .selected > .card-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .selected > .card-content {
    color: rgba(255, 255, 255, 0.5);
  }
`;
