import * as css from "styled-jsx/css";

export const SidebarStyles = css`
  .sidebar-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    max-width: 450px;
    border-right: 1px solid #e5e9f2;
    justify-content: space-around;
  }

  .sidebar-list {
    overflow: auto;
    height: 100%;
  }

  input {
    font-family: "Varela Round";
    font-size: 1.2em;
    font-weight: 300;
    padding: 10px;
    width: calc(100% - 20px);
    margin: 10px;
    margin-bottom: 30px;
    border: 1px solid #e5e9f2;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 1);
  }
`;
