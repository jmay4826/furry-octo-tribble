import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  conversations: Array<{
    conversation_id: number;
    participants: string[];
  }>;
  header: string;
}

interface IState {
  expanded: boolean;
}

class ConversationOutliers extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      expanded: true
    };
  }

  public toggleExpanded = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));

  public render() {
    return (
      <div>
        <h2 onClick={this.toggleExpanded}>
          <FontAwesomeIcon
            icon={this.state.expanded ? faAngleUp : faAngleDown}
            style={{ marginRight: "10px" }}
          />
          {this.props.header}
        </h2>
        <div
          style={{
            overflow: "hidden",
            maxHeight: this.state.expanded ? "100vh" : "0px"
          }}
        >
          {this.props.conversations.map(conversation => (
            <Link to={`/conversations/${conversation.conversation_id}`}>
              <div className="conversation-preview">
                <p className="conversations-preview-users">
                  {conversation.participants.reduce((acc, student, i, arr) => {
                    return i === arr.length - 1
                      ? `${acc} and ${student}`
                      : arr.length <= 2
                        ? student
                        : `${acc} ${student}`;
                  }, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export { ConversationOutliers };
