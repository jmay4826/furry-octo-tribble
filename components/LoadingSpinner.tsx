import * as React from "react";

interface IProps {
  style: React.CSSProperties;
  loading: boolean;
}

export const LoadingSpinner = ({ style, loading }: IProps) => (
  <React.Fragment>
    <div
      className="spin"
      style={{ visibility: loading ? "visible" : "hidden", ...style }}
    />
    <style jsx>{`
      .spin {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        margin: 5px;

        border: solid 2px transparent;
        border-top-color: #352646;
        border-left-color: #352646;
        border-radius: 50%;

        -webkit-animation: spinner 400ms linear infinite;
        animation: spinner 400ms linear infinite;
      }
      .spin {
        animation: spin infinite 1s linear;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </React.Fragment>
);
