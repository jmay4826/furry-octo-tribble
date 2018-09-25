import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import * as React from "react";
import { ConversationPreview } from "./ConversationPreview";
import { IConversation } from "./Conversations";
import { Typography } from "@material-ui/core";

interface IState {
  open: boolean;
}

interface IProps {
  conversations: IConversation[];
  username: string;
}

class StudentConversations extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  public toggleOpen = () => {
    this.setState(prev => ({ open: !prev.open }));
  };

  public render() {
    return (
      <React.Fragment>
        <ListItem onClick={this.toggleOpen}>
          <ListItemText primary={this.props.username} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open}>
          <List>
            {this.props.conversations.map(conversation => (
              <ConversationPreview {...conversation} key={conversation.id} />
            ))}
            {!this.props.conversations.length && (
              <Typography color="error">No conversations found</Typography>
            )}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export { StudentConversations };
