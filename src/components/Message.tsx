import * as React from "react";
import { UserContext } from "../App";

const Message = ({ from_id, from_username, content, sent_at }: IMessage) => {
  return (
    <UserContext.Consumer>
      {user => {
        return (
          <div
            className={`message-container ${
              from_id === user.id ? "right" : "left"
            }`}
          >
            <div
              className={`message-content ${
                from_id === user.id ? "right" : "left"
              }`}
            >
              {content}
            </div>
            <div className="message-info-container">
              <span className="bold">{from_username}</span> &bull;{" "}
              {new Date(sent_at).toLocaleString()}
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
};

export { Message };
