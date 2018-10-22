import * as React from "react";
import { MessageStyles } from "../styles/MessageStyles";
import { User } from "./User";

const Message = ({ from, content, sent_at }: IMessage) => {
  //TODO: USE A USER QUERY TO GET CURRENT USER
  const user = { id: 0 };

  return (
    <User>
      {({ loading, error, data }) => {
        if (error) return <p>Error</p>;
        if (!data && !loading) return <p>Error</p>;
        return (
          <div
            className={`message-container ${
              (data && from.id === data.me.id) || from.id === -1
                ? "right"
                : "left"
            }`}
          >
            <div
              className={`message-content ${
                (data && from.id === data.me.id) || from.id === -1
                  ? "right"
                  : "left"
              }`}
            >
              {content}
            </div>
            <div className="message-info-container">
              <span className="bold">{from.first_name}</span> &bull;{" "}
              {new Date(sent_at).toLocaleString()}
            </div>
            <style jsx>{MessageStyles}</style>
          </div>
        );
      }}
    </User>
  );
};

export { Message };
