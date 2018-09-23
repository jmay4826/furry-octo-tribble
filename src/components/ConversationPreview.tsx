import { Avatar, ListItem, ListItemText } from "@material-ui/core";
import { default as EmailIcon } from "@material-ui/icons/Email";
import * as React from "react";
import { withRouter } from "react-router-dom";

const ConversationPreview = withRouter(
  ({ sent_at, users, content, id, selected, ...props }: any) => {
    const handleClick = () => props.history.push(`/conversations/${id}`);
    return (
      <ListItem selected={id === +selected} button={true} onClick={handleClick}>
        <Avatar>
          <EmailIcon />
        </Avatar>
        <ListItemText
          primary={users.reduce(
            (acc: string, user: string, i: number, arr: string[]) =>
              i < arr.length - 1 ? `${acc} ${user},` : `${acc} ${user}`
          )}
          secondary={
            sent_at ? new Date(sent_at).toLocaleString() : "No messages yet"
          }
        />
      </ListItem>
    );
  }
);

export { ConversationPreview };
