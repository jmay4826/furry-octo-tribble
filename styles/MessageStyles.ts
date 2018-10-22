import * as css from "styled-jsx/css";
export const MessageStyles = css`
  .message-container {
    display: flex;
    flex-direction: column;
    margin: 10px;
    white-space: pre-line;
    /* max-width: 80%; */
  }

  .message-container.left {
    align-items: flex-start;
  }
  .message-container.right {
    align-items: flex-end;
  }

  .message-content {
    padding: 20px 35px;
    border-radius: 10px;
    position: relative;
    max-width: 80%;
    margin-bottom: 5px;
  }

  .message-content.right {
    color: rgba(255, 255, 255, 0.9);
    background-color: #7641ad;
    margin-right: 0.9em;
  }

  .message-content.left {
    color: rgba(0, 0, 0, 0.9);
    background-color: #f3f2f4;
    margin-left: 0.9em;
  }

  .message-content.right:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 1em solid transparent;
    border-left-color: #7641ad;
    border-right: 0;
    border-bottom: 0;
    margin-top: -0.4em;
    margin-right: -0.9em;
  }
  .message-content.left:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 1em solid transparent;
    border-right-color: #f3f2f4;
    border-left: 0;
    border-top: 0;
    margin-top: -0.4em;
    margin-left: -0.9em;
  }

  .message-info-container {
    font-size: 0.8em;
  }

  .left .message-info-container {
    margin-left: 0.9em;
    color: rgba(0, 0, 0, 0.4);
  }
  .right .message-info-container {
    margin-right: 0.9em;
    color: rgba(0, 0, 0, 0.4);
  }

  .bold {
    font-weight: 700;
  }
`;
