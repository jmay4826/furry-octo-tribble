import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { IMessage } from ".";

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
      style={{
        alignItems: from_username === current_user ? "flex-end" : "flex-start",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        whiteSpace: "pre-line"
      }}
    >
      <Card
        style={{
          width: "80%"
        }}
      >
        <CardContent>
          <Typography variant="headline">{from_username}</Typography>
          <Typography variant="subheading">
            {new Date(sent_at).toLocaleString()}
          </Typography>
          <p>{content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { Message };
