import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { default as EmailIcon } from "@material-ui/icons/Email";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IConversation } from "./Conversations";

interface IProps extends IConversation, RouteComponentProps {
  selected?: boolean;
}

const ConversationPreview = withRouter(
  ({ sent_at, users, id, selected = false, ...props }: IProps) => {
    const handleClick = () => props.history.push(`/conversations/${id}`);
    return (
      <ListItem selected={selected} button={true} onClick={handleClick}>
        <Avatar>
          <EmailIcon />
        </Avatar>
        <ListItemText
          primary={users.reduce(
            (acc, user, i, arr) =>
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
