import Axios from "axios";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ConversationPreview } from "./ConversationPreview";
import { NewConversation } from "./NewConversation";

interface IParams {
  student_id: string;
  section_id: string;
}

interface IProps extends RouteComponentProps<IParams> {
  sections: ISection[];
  student?: { first_name: string; last_name: string; user_id: number };
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

  public NewConversationComponent = (props: RouteComponentProps<IParams>) => {
    return (
      <NewConversation
        {...props}
        student={this.props.student}
        sections={this.props.sections}
      />
    );
  };

  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">
          {!this.state.conversations.length &&
            !this.state.loading &&
            `No conversations yet for ${
              this.props.student
                ? this.props.student.first_name
                : "this student"
            }`}
          {this.state.loading && "Loading conversations..."}
          {!!this.state.conversations.length &&
            `Conversations for ${
              this.props.student
                ? this.props.student.first_name
                : "this student"
            }`}
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
              render={this.NewConversationComponent}
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
