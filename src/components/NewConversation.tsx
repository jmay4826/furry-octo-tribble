import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import * as React from "react";
import { RouteComponentProps } from "react-router";
// import Axios from "axios";

interface IParams {
  student_id: string;
}

interface IStudent {
  first_name: string;
  last_name: string;
  user_id: number;
}

interface IProps extends RouteComponentProps<IParams> {
  sections: ISection[];
  student?: IStudent;
}

interface IState {
  section: ISection | undefined;
  student?: IStudent;
  students: IStudent[];
}

class NewConversation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      section: undefined,
      student: undefined,
      students: []
    };
  }
  public componentDidMount() {
    // Axios.get('/')
  }
  public handleChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      section: this.props.sections.find(
        section => section.section_id === e.currentTarget.value
      )
    });
  };
  public handleChangeStudent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      student: {
        user_id: +e.currentTarget.value,
        first_name: e.currentTarget.selectedOptions[0].label,
        last_name: "none"
      }
    });
  };

  public addStudent = () => {
    this.setState(prevState => {
      if (this.state.student) {
        return {
          student: undefined,
          students: [...prevState.students, this.state.student]
        };
      }
      return null;
    });
  };

  public removeStudent = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    this.setState(prevState => {
      return {
        students: prevState.students.filter(
          student => student.user_id !== +value
        )
      };
    });
  };

  public addConversation = async () => {
    try {
      await Axios.post(
        "/api/conversations",
        {
          users: [...this.state.students, this.props.student]
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  };

  public render() {
    return (
      <div>
        <div>
          <h3>Participants ({this.state.students.length + 1})</h3>
          {this.props.student && this.props.student.first_name}
          {this.state.students.length ? ", " : " "}
          {this.state.students.map((student, i, arr) => (
            <button
              value={student.user_id}
              key={student.user_id}
              onClick={this.removeStudent}
            >
              <span className="hidden">x</span>
              {i !== arr.length - 1
                ? student.first_name + ", "
                : student.first_name + " "}
            </button>
          ))}
          and
          {!this.state.students.length && "..."}
          <select
            className="inline"
            onChange={this.handleChangeSection}
            value={this.state.section ? this.state.section.section_id : ""}
          >
            <option value="">Section</option>
            {this.props.sections.map(section => (
              <option value={section.section_id} key={section.section_id}>
                {section.section_id}
              </option>
            ))}
          </select>
          {this.state.section && (
            <span>
              <select
                className="inline"
                onChange={this.handleChangeStudent}
                value={this.state.student ? this.state.student.user_id : "0"}
              >
                <option value="0">Student</option>
                {this.state.section.students.map(student => (
                  <option key={student.user_id} value={student.user_id}>
                    {student.first_name}
                  </option>
                ))}
              </select>
              <span onClick={this.addStudent}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </span>
          )}
        </div>
        <button onClick={this.addConversation}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    );
  }
}

export { NewConversation };
