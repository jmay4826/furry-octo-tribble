// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import * as React from "react";

interface IMessageWithUser extends IMessage {
  current_user: string;
}

const Message = ({
  from_username,
  content,
  sent_at,
  current_user
}: IMessageWithUser) => {
  return (
    <div
      className={`message-container ${
        from_username === current_user ? "right" : "left"
      }`}
    >
      <div
        className={`message-content ${
          from_username === current_user ? "right" : "left"
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
