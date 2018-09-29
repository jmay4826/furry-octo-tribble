import Axios from "axios";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ConversationPreview } from "./ConversationPreview";
import { NewConversation } from "./NewConversation";

interface IProps
  extends RouteComponentProps<{ student_id: string; section_id: string }> {
  sections: ISection[];
  student?: { username: string; user_id: number };
}

class InstructorConversations extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      conversations: [],
      error: "",
      filter: ""
    };
  }

  public getConversations() {
    Axios.get(
      `/api/students/${this.props.match.params.student_id}/conversations`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    )
      .then(({ data: { conversations } }) => {
        // tslint:disable-next-line:no-console
        console.log(conversations);
        this.setState({ conversations, loading: false });
      })
      .catch(error => this.setState({ error }));
  }
  public componentDidMount() {
    this.getConversations();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (
      prevProps.match.params.student_id !== this.props.match.params.student_id
    ) {
      this.setState({ conversations: [], loading: true });
      this.getConversations();
    }
  }
  public render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="messages-header">
          {!this.state.conversations.length &&
            !this.state.loading &&
            `No conversations yet for ${
              this.props.student ? this.props.student.username : "this student"
            }`}
          {this.state.loading && "Loading conversations..."}
          {!!this.state.conversations.length &&
            `Conversations for ${this.state.conversations[0].current_user}`}
        </div>
        <div className="messages-list">
          <div className="conversation-preview">
            <p className="conversation-preview-users">
              <Link
                to={`/sections/${this.props.match.params.section_id}/students/${
                  this.props.match.params.student_id
                }/conversations/new`}
              >
                Add a New Conversation{" "}
              </Link>
            </p>

            <Route
              path="/sections/:section_id/students/:student_id/conversations/new"
              render={props => {
                console.log(props);
                return (
                  <NewConversation
                    {...props}
                    student={this.props.student}
                    sections={this.props.sections}
                  />
                );
              }}
            />
          </div>

          {this.state.conversations.map((conversation: IConversation) => (
            <ConversationPreview key={conversation.id} {...conversation} />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export { InstructorConversations };
