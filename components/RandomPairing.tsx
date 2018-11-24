import * as React from "react";
import { SectionSelect } from "./SectionSelect";
import { InputStyles } from "../styles/InputStyles";
import { ApolloClient } from "apollo-boost";
import gql from "graphql-tag";
import { chunk } from "lodash";

interface IProps {
  section_id: string;
  client: ApolloClient<any>;
  students: any[];
  previewGroups: (groups: any[]) => void;
}

interface IState {
  sectionAQuantity: string;
  sectionBQuantity: string;
  sectionB: string;
  conversations: any;
}

const STUDENTS_IN_SECTION_QUERY = gql`
  query STUDENTS_IN_SECTION_QUERY($section_id: ID!) {
    appusers(
      where: {
        # role: "student"
        user_sections_some: { section: { id: $section_id } }
      }
    ) {
      id
      first_name
      last_name
      user_conversations {
        id
      }
    }
  }
`;

const ADD_CONVERSATIONS_MUTATION = gql`
  mutation ADD_CONVERSATIONS_MUTATION(
    $conversations: [[AppuserWhereInput]]!
    $sections: [String]!
  ) {
    addConversations(conversations: $conversations, sections: $sections) {
      message
    }
  }
`;

export class RandomPairing extends React.Component<IProps, IState> {
  state = {
    sectionAQuantity: "1",
    sectionBQuantity: "1",
    sectionB: "",
    conversations: []
  };

  handleChange = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ [name]: value } as Pick<IState, keyof IState>);

  handleSelect = ({
    currentTarget: { value }
  }: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ sectionB: value });

  previewPairing = async () => {
    const sectionBStudents = (await this.props.client.query<{
      appusers: [any];
    }>({
      query: STUDENTS_IN_SECTION_QUERY,
      variables: { section_id: this.state.sectionB }
    })).data.appusers.map(({ __typename, ...student }) => student);

    sectionBStudents.sort(
      (a, b) => a.user_conversations.length - b.user_conversations.length
    );

    const groups = new Array(
      Math.ceil(this.props.students.length / +this.state.sectionAQuantity)
    ).fill([]);

    this.props.students.forEach((student, i) => {
      const group = i % groups.length;
      groups[group] = [...groups[group], student];
    });

    sectionBStudents.every((student, i) => {
      const group = i % groups.length;
      if (!group) return false;
      console.log(group);
      console.log(groups.length);
      if (
        groups[group].length <
        +this.state.sectionAQuantity + +this.state.sectionBQuantity
      ) {
        groups[group] = [...groups[group], student];
        return true;
      } else {
        return false;
      }
    });

    const conversations = groups.map(group => group.map(({ id }) => ({ id })));

    this.setState({ conversations });
    this.props.previewGroups(groups);
    console.log(groups);
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <p>
          <strong>Random Pairing</strong>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div>
            <input
              value={this.state.sectionAQuantity}
              type="number"
              style={{ width: "3em" }}
              name="sectionAQuantity"
              onChange={this.handleChange}
            />{" "}
            student
            {this.state.sectionAQuantity !== "1" && "s"} from{" "}
            <strong>{this.props.section_id}</strong> with
          </div>
          <div>
            <input
              value={this.state.sectionBQuantity}
              type="number"
              style={{ width: "3em" }}
              name="sectionBQuantity"
              onChange={this.handleChange}
            />{" "}
            student
            {this.state.sectionBQuantity !== "1" && "s"} from{" "}
            <SectionSelect
              value={this.state.sectionB}
              onChange={this.handleSelect}
              style={{ display: "inline-block" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={this.previewPairing}>Preview</button>
            <button
              onClick={() => {
                this.props.client.mutate({
                  mutation: ADD_CONVERSATIONS_MUTATION,
                  variables: {
                    conversations: this.state.conversations,
                    sections: [this.props.section_id, this.state.sectionB]
                  }
                });
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <style jsx>{InputStyles}</style>
      </div>
    );
  }
}
