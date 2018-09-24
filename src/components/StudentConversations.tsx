import * as React from "react";
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Redirect } from "react-router";

class StudentConversations extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      conversation: 0
    };
  }

  render() {
    console.log(this.props);
    return this.state.conversation ? (
      <Redirect to={`conversations/${this.state.conversation}`} push={true} />
    ) : (
      <React.Fragment>
        <ListItem
          onClick={() => this.setState((prev: any) => ({ open: !prev.open }))}
        >
          <ListItemText primary={this.props.username} />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open}>
          <List>
            {this.props.conversations.map((conversation: any) => (
              <ListItem
                onClick={() =>
                  this.setState({ conversation: conversation.conversation_id })
                }
              >
                <ListItemText
                  inset={true}
                  primary={conversation.participants.reduce(
                    (acc: string, part: string) => `${acc}, ${part}`
                  )}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export { StudentConversations };
