// import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
// import { Link } from "react-router-dom";
import { StudentOutliers } from "./StudentOutliers";
import { ConversationOutliers } from "./ConversationOutliers";

interface IParams {
  section_id: string;
}

interface IState {
  noActivity: any[];
  noConversations: any[];
  noMessages: any[];
}

class SectionOverview extends React.Component<
  RouteComponentProps<IParams>,
  IState
> {
  constructor(props: RouteComponentProps<IParams>) {
    super(props);
    this.state = {
      noActivity: [],
      noConversations: [],
      noMessages: []
    };
  }

  public async componentDidMount() {
    const {
      data: { noConversations, noMessages, noActivity }
    } = await Axios.get(`/api/sections/${this.props.match.params.section_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    this.setState({ noConversations, noMessages, noActivity });
  }
  public render() {
    return (
      <div style={{ overflow: "auto", border: "1px solid red", flexGrow: 1 }}>
        <StudentOutliers
          section_id={this.props.match.params.section_id}
          students={this.state.noConversations}
          header={`Students without conversations (${
            this.state.noConversations.length
          })`}
        />

        <ConversationOutliers
          conversations={this.state.noMessages}
          header={`Conversations without messages (${
            this.state.noMessages.length
          })`}
        />
        <p>Conversations with no activity 7 days+</p>
        <p>Sections paired with</p>
        <button>Randomly pair students with section X</button>
      </div>
    );
  }
}

export { SectionOverview };
