import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as React from "react";
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { InstructorConversations } from "./InstructorConversations";
import { NewStudent } from "./NewStudent";

interface IState {
  sections: ISection[];
}

interface IParams {
  section_id: string;
  student_id?: string;
}

class InstructorDashboard extends React.Component<
  RouteComponentProps<IParams>,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      sections: []
    };
  }
  public async componentDidMount() {
    try {
      const {
        data: { sections }
      } = await Axios.get<{ sections: ISection[] }>("/api/sections", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      this.setState({ sections });
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }

  public handleSelect = (e: React.SyntheticEvent<HTMLSelectElement>) =>
    this.props.history.push(`/sections/${e.currentTarget.value}`);

  public render() {
    // tslint:disable-next-line:no-console
    let selected: ISection | undefined;
    selected = this.state.sections.find(
      section => section.section_id === +this.props.match.params.section_id
    );

    return this.state.sections.length && !this.props.match.params.section_id ? (
      <Redirect to={`/sections/${this.state.sections[0].section_id}`} />
    ) : (
      <div className="conversations-container">
        <div className="conversations-list-container">
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              margin: "10px"
            }}
          >
            <select
              style={{ flexGrow: 1 }}
              value={this.props.match.params.section_id}
              onChange={this.handleSelect}
            >
              <option key="new" value="new">
                New Section
              </option>
              {this.state.sections.map((section: any) => (
                <option key={section.section_id} value={section.section_id}>
                  {section.name}
                </option>
              ))}
            </select>
            <Link to="/sections/new">
              <FontAwesomeIcon
                icon={faPlusSquare}
                size="lg"
                style={{ marginLeft: "10px" }}
              />
            </Link>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              margin: "10px"
            }}
          >
            <h2 style={{ flexGrow: 1 }}>Students</h2>
            <Link
              to={`/sections/${
                this.props.match.params.section_id
              }/students/new`}
            >
              <FontAwesomeIcon
                icon={faPlusSquare}
                size="lg"
                style={{ marginLeft: "10px" }}
              />
            </Link>
          </div>
          <div className="conversations-list">
            {selected &&
              selected.students.map(student => (
                <Link
                  key={student.user_id}
                  to={`/sections/${
                    this.props.match.params.section_id
                  }/students/${student.user_id}`}
                >
                  <div
                    className={`conversation-preview ${
                      this.props.match.params.student_id &&
                      +this.props.match.params.student_id === student.user_id
                        ? "selected"
                        : ""
                    }`}
                  >
                    <p className="conversation-preview-users">
                      {student.username}
                    </p>
                    {/* TODO: 
                      * Add number of conversations?
                      * Add last message timestamp?
                      */}
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="messages-container">
          <Switch>
            <Route
              path="/sections/new"
              render={props => {
                console.log(props);
                return <h1>new section</h1>;
              }}
            />

            <Route
              path="/sections/:section_id/students/new"
              render={props => <NewStudent {...props} section={selected} />}
            />
            <Route
              path="/sections/:section_id/students/:student_id"
              render={props => (
                <InstructorConversations
                  {...props}
                  student={
                    selected
                      ? selected.students.find(
                          student =>
                            this.props.match.params.student_id
                              ? student.user_id ===
                                +this.props.match.params.student_id
                              : false
                        )
                      : undefined
                  }
                  sections={this.state.sections}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export { InstructorDashboard };
