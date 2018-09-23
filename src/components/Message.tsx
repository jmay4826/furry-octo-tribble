import { default as Card } from "@material-ui/core/Card";
import { default as CardContent } from "@material-ui/core/CardContent";
import { default as Typography } from "@material-ui/core/Typography";
import * as React from "react";

const Message = ({ from_username, content, sent_at }: any) => {
  return (
    <div
      style={{
        alignItems: from_username === "jonathanm" ? "flex-end" : "flex-start",
        display: "flex",
        flexDirection: "column",
        margin: "10px"
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
            {new Date(sent_at).toLocaleDateString()}{" "}
            {new Date(sent_at).toLocaleTimeString()}
          </Typography>
          <p>{content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { Message };
