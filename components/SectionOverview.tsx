import Axios from "axios";
import { shuffle } from "lodash";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ConversationOutliers } from "./ConversationOutliers";
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
  partners: any[];
  unmatched: any[];
  copied: boolean;
}

class SectionOverview extends React.Component<IProps, IState> {
  public linkInput: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.linkInput = React.createRef();
    this.state = {
      noActivity: [],
      noConversations: [],
      noMessages: [],
      partners: [],
      unmatched: [],
      copied: false
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
          selected[i] ? [...acc, { a: student, b: selected[i] }] : acc,
        []
      );

      const unmatched = this.state.noConversations.slice(selected.length);

      this.setState({ partners, unmatched });
    }
  };

  public submit = async () => {
    const result = await Axios.post(
      "/api/conversations",
      {
        partners: this.state.partners,
        section_id: this.props.match.params.section_id
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }
    );
    console.log(result);
  };

  public copyLink = () => {
    if (this.linkInput.current) {
      this.linkInput.current.select();
      document.execCommand("copy");
      this.setState({ copied: true });
    }
  };

  public render() {
    return (
      <React.Fragment>
        <div className="messages-header">
          {this.props.match.params.section_id}
        </div>
        <div className="messages-list">
          <p>Student invitation link:</p>
          <input
            onClick={this.copyLink}
            ref={this.linkInput}
            value={`${window.location.host}/join?section_id=${
              this.props.match.params.section_id
            }`}
            readOnly={true}
          />
          {this.state.copied && "Copied!"}
          <StudentOutliers
            section_id={this.props.match.params.section_id}
            students={
              this.state.partners.length ? [] : this.state.noConversations
            }
            header={`Students without conversations (${
              this.state.noConversations.length
            })`}
          >
            {!!this.state.partners.length &&
              this.state.partners.map(partner => (
                <div
                  key={partner.a.user_id}
                  className="conversation-preview"
                  style={{ width: "10vw" }}
                >
                  <p className="conversation-preview-users">
                    {partner.a.first_name} {partner.a.last_name}
                  </p>
                  <p className="conversation-preview-content">
                    {partner.b.first_name} {partner.b.last_name}
                  </p>
                </div>
              ))}
            {!!this.state.unmatched.length &&
              this.state.unmatched.map(student => (
                <div
                  key={student.user_id}
                  className="conversation-preview"
                  style={{ background: "yellow", width: "10vw" }}
                >
                  <p className="conversation-preview-users">
                    {student.first_name} {student.last_name}
                  </p>
                </div>
              ))}
          </StudentOutliers>
          {!this.state.noConversations.length ? (
            <div>All students have at least 1 conversation</div>
          ) : (
            <div
              style={{
                alignItems: "center",
                display: "flex",

                margin: "0 10%"
              }}
            >
              Randomly pair students with
              <select
                style={{ marginBottom: "10px" }}
                value={
                  this.state.selected
                    ? this.state.selected.section_id.toString()
                    : "Section"
                }
                onChange={this.handleSelect}
              >
                <option value="Section">Select a Section</option>
                {this.props.sections
                  .filter(
                    section =>
                      section.section_id !== this.props.match.params.section_id
                  )
                  .map(section => (
                    <option key={section.section_id} value={section.section_id}>
                      {section.section_id}
                    </option>
                  ))}
              </select>
              <button onClick={this.handleClick}>Preview</button>
              {!!this.state.partners.length && (
                <button onClick={this.submit}>Submit</button>
              )}
            </div>
          )}

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
      </React.Fragment>
    );
  }
}

export { SectionOverview };
