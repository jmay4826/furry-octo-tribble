import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { CardStyles } from "../styles/CardStyles";

interface IState {
  expanded: boolean;
}

interface IProps {
  expandable?: boolean;
  defaultExpanded?: boolean;
  header: string;
  headerSize?: "large" | "small";
}

export class Card extends React.Component<IProps, IState> {
  state = {
    expanded: this.props.defaultExpanded || false
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) =>
    this.setState(prev => ({ expanded: !prev.expanded }));
  public render() {
    return (
      <div className="card">
        <button
          className="card-header"
          onClick={this.props.expandable ? this.handleClick : undefined}
        >
          {this.props.expandable && (
            <FontAwesomeIcon
              icon={this.state.expanded ? faAngleDown : faAngleRight}
              style={{ margin: "0 10px" }}
            />
          )}
          <p>{this.props.header}</p>
        </button>
        {/* )} */}
        <div
          className={`${this.props.expandable ? "expandable" : ""} ${
            this.state.expanded ? "expanded" : ""
          }`}
        >
          {this.props.children}
        </div>
        <style jsx>{`
          .expandable {
            transition: all 300ms;
            max-height: 0;
            overflow: hidden;
          }
          .expandable.expanded {
            max-height: 1000px;
          }

          .card-header {
            display: flex;
          }
          button {
            background: none;
            border: none;
            font-size: 1em;

            font-family: "Varela Round";
            outline: none;
          }
          .card {
            display: flex;
            flex-direction: column;
          }
        `}</style>
        <style jsx>{CardStyles}</style>
      </div>
    );
  }
}
