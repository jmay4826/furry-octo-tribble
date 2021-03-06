import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { sortBy } from "lodash";
import * as React from "react";
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { InstructorConversations } from "./InstructorConversations";
import { NewSection } from "./NewSection";
import { NewStudent } from "./NewStudent";
import { SectionOverview } from "./SectionOverview";
import { SectionSelect } from "./SectionSelect";

interface IState {
  sections: ISection[];
  selectedSection?: ISection;
  loading: boolean;
}

interface IParams {
  section_id?: string;
  student_id?: string;
}

class Sections extends React.Component<RouteComponentProps<IParams>, IState> {
  constructor(props: RouteComponentProps<IParams>) {
    super(props);
    this.state = {
      sections: [],
      loading: true
    };
  }

  public componentDidUpdate(prevProps: RouteComponentProps<IParams>) {
    if (
      (!this.props.match.params.section_id ||
        this.props.match.params.section_id === "new") &&
      this.state.selectedSection
    ) {
      return this.setState({ selectedSection: undefined });
    }
    if (
      !this.props.match.params.section_id ||
      this.props.match.params.section_id === "new"
    ) {
      return null;
    }
    if (
      prevProps.match.params.section_id !==
        this.props.match.params.section_id ||
      !this.state.selectedSection
    ) {
      const selectedSection = this.state.sections.find(
        section =>
          this.props.match.params.section_id
            ? section.section_id === this.props.match.params.section_id
            : false
      );
      return this.setState({ selectedSection });
    }
  }

  public getSections = async () => {
    try {
      const {
        data: { sections }
      } = await Axios.get<{ sections: ISection[] }>("/api/sections", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      this.setState({ sections, loading: false });
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  };

  public async componentDidMount() {
    this.getSections();
  }

  public handleSelect = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.props.history.push(`/sections/${e.currentTarget.value}`);
  };

  public renderStudent = (
    props: RouteComponentProps<{ section_id: string; student_id: string }>
  ) => {
    const selectedStudent =
      this.state.selectedSection &&
      this.state.selectedSection.students.find(
        student => student.user_id === +props.match.params.student_id
      );
    return (
      <InstructorConversations
        {...props}
        student={selectedStudent}
        sections={this.state.sections}
      />
    );
  };

  public renderStudents = () =>
    this.state.selectedSection &&
    sortBy(this.state.selectedSection.students, "last_name").map(student => (
      <Link
        key={student.user_id}
        to={`/sections/${this.props.match.params.section_id}/students/${
          student.user_id
        }`}
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
            {student.first_name} {student.last_name}
          </p>
          <p className="conversation-preview-content">
            {student.conversation_count} conversation
            {+student.conversation_count !== 1 && "s"}
            <br />
            {student.message_count} message
            {+student.message_count !== 1 && "s"} sent
          </p>
        </div>
      </Link>
    ));

  public renderInstructors = () =>
    this.state.selectedSection && (
      <React.Fragment>
        <h2>Instructors</h2>
        {sortBy(this.state.selectedSection.instructors, "last_name").map(
          student => (
            <Link
              key={student.user_id}
              to={`/sections/${this.props.match.params.section_id}/students/${
                student.user_id
              }`}
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
                  {student.first_name} {student.last_name}
                </p>
                <p className="conversation-preview-content">
                  {student.conversation_count} conversation
                  {+student.conversation_count !== 1 && "s"}
                  <br />
                  {student.message_count} message
                  {+student.message_count !== 1 && "s"} sent
                </p>
              </div>
            </Link>
          )
        )}
      </React.Fragment>
    );

  public renderNewStudent = (
    props: RouteComponentProps<{ section_id: string }>
  ) => <NewStudent {...props} section={this.state.selectedSection} />;

  public render() {
    if (this.state.sections.length && !this.props.match.params.section_id) {
      return <Redirect to={`/sections/${this.state.sections[0].section_id}`} />;
    }

    return (
      <React.Fragment>
        <div className="conversations-list-container">
          <SectionSelect
            value={this.props.match.params.section_id || "new"}
            sections={this.state.sections}
            handleSelect={this.handleSelect}
          />
          <Switch>
            <Route path="/sections/new" render={undefined} />
            <Route
              path="/sections/:section_id/(students)?/:student_id?"
              /* tslint:disable:jsx-no-lambda */
              render={() => (
                <div className="header-link">
                  <h2>
                    Students (
                    {this.state.selectedSection &&
                      this.state.selectedSection.students.length}
                    )
                  </h2>
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
              )}
              /* tslint:enable:jsx-no-lambda */
            />
          </Switch>

          <div className="conversations-list">
            {this.renderStudents()}
            {this.renderInstructors()}
            {!this.state.loading &&
              !this.state.sections.length && (
                <div className="conversation-preview">
                  <p className="conversation-preview-users">
                    You don't have any sections yet!
                  </p>
                  <p className="conversation-preview-content">
                    Click the plus icon above to create a new section. If you're
                    collaborating with another instructor, ask to be added as a
                    collaborator.
                  </p>
                </div>
              )}
          </div>
        </div>
        <div className="messages-container">
          <Switch>
            <Route
              path="/sections/new"
              render={props => (
                <NewSection {...props} refreshSections={this.getSections} />
              )}
            />
            <Route
              exact={true}
              path="/sections/:section_id"
              render={props => (
                <SectionOverview
                  key={this.props.match.params.section_id}
                  {...props}
                  sections={this.state.sections}
                />
              )}
            />
            <Route
              path="/sections/:section_id/students/new"
              render={this.renderNewStudent}
            />
            <Route
              path="/sections/:section_id/students/:student_id"
              render={this.renderStudent}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export { Sections };
