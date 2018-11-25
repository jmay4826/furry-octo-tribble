import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";
import { Flipper, Flipped } from "react-flip-toolkit";
import { ConversationPreview } from "./ConversationPreview";
import { SidebarStyles } from "../styles/SidebarStyles";
import { User } from "./User";
import { Card } from "./Card";
import { CardStyles } from "../styles/CardStyles";

interface IProps {
  conversation_id: number;
}

interface IState {
  filter?: string;
}

export const GET_CONVERSATIONS_QUERY = gql`
  query GET_CONVERSATIONS_QUERY($user_id: Int!) {
    conversations {
      id
      messages(orderBy: sent_at_DESC, first: 1) {
        id
        content
        from {
          id
          first_name
        }
        sent_at
      }
      user_conversations(
        where: { user: { role_not: "instructor", id_not: $user_id } }
      ) {
        user {
          first_name
        }
      }
    }
  }
`;

export class Conversations extends React.Component<IProps, IState> {
  state = { filter: "" };

  public handleChange = ({
    currentTarget: { name, value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: value } as Pick<IState, keyof IState>);
  };

  public filter = (conversation: IConversation) =>
    JSON.stringify(conversation.user_conversations)
      .toLowerCase()
      .indexOf(this.state.filter.toLowerCase()) !== -1;

  public render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (!data && !loading) return <p>Error</p>;
          return (
            <Query
              query={GET_CONVERSATIONS_QUERY}
              variables={{ user_id: data && data.me.id }}
              pollInterval={1000 * 60}
            >
              {({
                loading,
                error,
                data
              }: QueryResult<{ conversations: [IConversation] }>) => {
                if (loading) return <p>Loading</p>;
                if (error) return <p>Error</p>;
                if (!data) return <p>Error</p>;
                return (
                  <div className="sidebar-container">
                    <input
                      type="text"
                      name="filter"
                      value={this.state.filter}
                      placeholder="Filter by username"
                      onChange={this.handleChange}
                      className="filter"
                    />
                    <h2>Conversations</h2>
                    <div className="sidebar-list">
                      <Flipper flipKey={JSON.stringify(data.conversations)}>
                        {data.conversations
                          .filter(this.filter)
                          .sort((a, b) => {
                            if (!a.messages[0]) {
                              return 1;
                            }

                            if (!b.messages[0]) {
                              return -1;
                            }

                            if (a.messages[0].sent_at > b.messages[0].sent_at) {
                              return -1;
                            }
                            if (
                              a.messages[0].sent_at === b.messages[0].sent_at
                            ) {
                              return 0;
                            } else {
                              return 1;
                            }
                          })
                          .map(conversation => (
                            <Flipped
                              flipId={conversation.id.toString()}
                              key={conversation.id}
                            >
                              <ConversationPreview
                                key={conversation.id}
                                {...conversation}
                                selected={
                                  this.props.conversation_id
                                    ? +this.props.conversation_id ===
                                      conversation.id
                                    : false
                                }
                              />
                            </Flipped>
                          ))}
                      </Flipper>
                      {!loading && !data.conversations.length && (
                        <Card header="No conversations yet!">
                          <div>
                            <p className="card-content">
                              When your instructor assigns a partner to you,
                              your messages will appear here. Check back soon!
                            </p>
                          </div>
                        </Card>
                      )}
                    </div>
                    <style jsx>{SidebarStyles}</style>
                    <style jsx>{CardStyles}</style>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}
