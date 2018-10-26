import * as React from "react";
import { SectionInput } from "./SectionInput";
import { adopt } from "react-adopt";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const JOIN_SECTION_MUTATION = gql`
  mutation JOIN_SECTION_MUTATION($section_id: String!) {
    joinSection(section_id: $section_id) {
      message
    }
  }
`;

export class JoinSection extends React.Component<{}, { section_id: string }> {
  state = { section_id: "" };

  handleChange = ({
    currentTarget: { value }
  }: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ section_id: value });

  public render() {
    console.log(this.state);
    return (
      <Mutation mutation={JOIN_SECTION_MUTATION}>
        {(joinSection, { error, called, loading }) => (
          <div style={{ flexBasis: "50%" }}>
            <div style={{ textAlign: "center" }}>
              <h3>Request to join a new section</h3>
              <SectionInput onChange={this.handleChange} />
              <button
                onClick={e => {
                  e.preventDefault();
                  joinSection({ variables: this.state });
                }}
              >
                Submittttt
              </button>
              <p
                style={{
                  visibility: error ? "visible" : "hidden"
                }}
              >
                An error occurred.
              </p>
              <p
                style={{
                  visibility:
                    called && !error && !loading ? "visible" : "hidden"
                }}
              >
                Successfully Updated
              </p>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
