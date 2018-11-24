import * as React from "react";
import { CardStyles } from "../styles/CardStyles";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Card } from "./Card";
import { RandomPairing } from "./RandomPairing";

interface IProps {
  section_id: string;
}
interface IState {
  expanded: boolean;
  groups: any[];
}

const NO_CONVERSATION_QUERY = gql`
  query NO_CONVERSATION_QUERY($section_id: ID!) {
    appusers(
      where: {
        user_conversations_none: { id_not: null }
        user_sections_some: { section: { id: $section_id } }
      }
    ) {
      id
      first_name
      last_name
    }
  }
`;

export class NoConversationsOutliers extends React.Component<IProps, IState> {
  state = {
    expanded: false,
    groups: []
  };

  previewGroups = (groups: any[]) => this.setState({ groups });

  public render() {
    return (
      <Query
        query={NO_CONVERSATION_QUERY}
        variables={{ section_id: this.props.section_id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>Error</p>;
          if (!data) return <p>Error</p>;
          return (
            <Card
              header={`Students without Conversations (${
                data.appusers.length
              })`}
              expandable={true}
              defaultExpanded={true}
            >
              <div className="card-content">
                <ApolloConsumer>
                  {client => (
                    <RandomPairing
                      section_id={this.props.section_id}
                      client={client}
                      students={data.appusers}
                      previewGroups={this.previewGroups}
                    />
                  )}
                </ApolloConsumer>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {this.state.groups.length
                    ? this.state.groups.map(group => (
                        <div style={{ border: "1px solid blue" }}>
                          {group.map(user => (
                            <p>
                              {user.first_name} {user.last_name}
                            </p>
                          ))}
                        </div>
                      ))
                    : data.appusers.map(user => (
                        <div style={{ margin: "5px", width: "18%" }}>
                          {user.first_name} {user.last_name}
                        </div>
                      ))}
                </div>
              </div>
              <style jsx>{CardStyles}</style>
            </Card>
          );
        }}
      </Query>
    );
  }
}
