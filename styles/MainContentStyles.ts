import * as css from "styled-jsx/css";
export const MainContentStyles = css`
  .main-content-container {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
  }

  .main-content {
    flex-grow: 1;
    overflow: auto;
  }

  .main-content-header {
    font-family: "Varela Round";
    font-size: 1.2em;
    font-weight: 300;
    padding: 20px;
    text-overflow: ellipsis;
    border-bottom: 1px solid #e5e9f2;
    flex-grow: 0;
  }
`;
