import List from "@material-ui/core/List";
import Axios from "axios";
import * as React from "react";

import { StudentConversations } from "./StudentConversations";
import { TextField } from "@material-ui/core";

class Students extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      filter: "",
      students: []
    };
  }
  public componentDidMount() {
    Axios.get("/api/students", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(({ data: { students } }) => {
        this.setState({ students });
      })
      .catch(error => this.setState({ error }));
  }

  public render() {
    return (
      <div>
        <h1>My Students</h1>
        <TextField onChange={e => this.setState({ filter: e.target.value })} />
        <List>
          {this.state.students
            .filter((student: any) =>
              student.username.includes(this.state.filter)
            )
            .map((student: any) => (
              <StudentConversations key={student.user_id} {...student} />
            ))}
        </List>
      </div>
    );
  }
}

export { Students };
