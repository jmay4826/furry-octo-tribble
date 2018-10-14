import Axios from "axios";
import { shuffle } from "lodash";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ConversationOutliers } from "./ConversationOutliers";
import { SectionSelect } from "./SectionSelect";
import { StudentOutliers } from "./StudentOutliers";

interface IParams {
  section_id: string;
}

interface IProps extends RouteComponentProps<IParams> {
  sections: ISection[];
}

interface IState {
  noActivity: any[];
  noConversations: any[];
  noMessages: any[];
  selected?: ISection;
}

class SectionOverview extends React.Component<IProps, IState> {
  constructor(props: IProps) {
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

  public handleSelect = ({
    currentTarget: { value }
  }: React.SyntheticEvent<HTMLSelectElement>) =>
    this.setState({
      selected: this.props.sections.find(
        section => section.section_id === value
      )
    });

  public handleClick = () => {
    if (this.state.selected) {
      const selected = shuffle(this.state.selected.students).sort((a, b) => {
        if (+a.conversation_count > +b.conversation_count) {
          return 1;
        } else {
          return -1;
        }
      });

      const partners = this.state.noConversations.reduce(
        (acc, student, i) =>
          selected[i]
            ? [...acc, { a: student.id, b: selected[i].user_id }]
            : acc,
        []
      );

      if (this.state.noConversations.length > selected.length) {
        console.log(
          this.state.noConversations.slice(
            this.state.noConversations.length - 1
          )
        );
      }

      console.log(partners);
    }
  };

  public render() {
    console.log(this.props.sections);
    return (
      <div style={{ overflow: "auto", flexGrow: 1 }}>
        <StudentOutliers
          section_id={this.props.match.params.section_id}
          students={this.state.noConversations}
          header={`Students without conversations (${
            this.state.noConversations.length
          })`}
        >
          <div>
            <button style={{ display: "flex" }} onClick={this.handleClick}>
              Randomly pair students with
              <SectionSelect
                handleSelect={this.handleSelect}
                sections={this.props.sections}
                value={
                  this.state.selected
                    ? this.state.selected.section_id.toString()
                    : "section"
                }
              />
            </button>
          </div>
        </StudentOutliers>

        <ConversationOutliers
          conversations={this.state.noMessages}
          header={`Conversations without messages (${
            this.state.noMessages.length
          })`}
        />
        <ConversationOutliers
          conversations={this.state.noActivity}
          header={`Conversations with no activity 7+ days (${
            this.state.noActivity.length
          })`}
        />
        <p>Sections paired with</p>
      </div>
    );
  }
}

export { SectionOverview };
