import * as React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

const Message = ({ from_username, content, sent_at }: any) => {
  return (
    <div
      style={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: from_username === "jonathanm" ? "flex-end" : "flex-start"
      }}
    >
      <Card
        style={{
          width: "80vw"
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
