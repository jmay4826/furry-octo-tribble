import * as React from "react";
import { Link } from "react-router-dom";
import { ListItem, Avatar, ListItemText } from "@material-ui/core";
import { default as EmailIcon } from "@material-ui/icons/Email";

const ConversationPreview = ({ sent_at, users, content, id }: any) => {
  return (
    <Link to={`/conversations/${id}`}>
      <ListItem button={true}>
        <Avatar>
          <EmailIcon />
        </Avatar>
        <ListItemText
          primary={users.reduce(
            (acc: string, user: string, i: number, arr: string[]) =>
              i < arr.length - 1 ? `${acc} ${user},` : `${acc} ${user}`
          )}
          secondary={new Date(sent_at).toLocaleString()}
        />
      </ListItem>
    </Link>
  );
};

export { ConversationPreview };
