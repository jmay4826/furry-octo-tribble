import List from "@material-ui/core/List";
import Axios from "axios";
import * as React from "react";

import { StudentConversations } from "./StudentConversations";

class Students extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      students: []
    };
  }
  public componentDidMount() {
    Axios.get("/api/students", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(({ data: { students } }) => {
        console.log(students);
        this.setState({ students });
      })
      .catch(error => this.setState({ error }));
  }
  public render() {
    return (
      <div>
        <h1>My Students</h1>
        <List>
          {this.state.students.map((student: any) => (
            <StudentConversations {...student} />
          ))}
        </List>
      </div>
    );
  }
}

export { Students };
