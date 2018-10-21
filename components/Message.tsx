import * as React from "react";

const Message = ({ from_id, from_username, content, sent_at }: IMessage) => {
  return (
    <div
      className={`message-container ${
        // from_id === user.id ? "right" : "left"
        ""
      }`}
    >
      <div
        className={`message-content ${
          // from_id === user.id ? "right" : "left"
          ""
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
};

export { Message };
