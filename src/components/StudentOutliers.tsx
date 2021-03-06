import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  section_id: string;
  students: any[];
  header: string;
}

interface IState {
  expanded: boolean;
}

class StudentOutliers extends React.Component<IProps, IState> {
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
            maxHeight: this.state.expanded ? "100vh" : "0px",
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {this.props.students.map(student => (
            <Link
              key={student.user_id}
              to={`/sections/${this.props.section_id}/students/${
                student.user_id
              }`}
            >
              <div
                className="conversation-preview"
                style={{ flexGrow: 0, width: "10vw" }}
              >
                <p className="conversations-preview-users">
                  {student.first_name} {student.last_name}{" "}
                  {student.participants}
                </p>
              </div>
            </Link>
          ))}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export { StudentOutliers };
