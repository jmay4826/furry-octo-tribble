import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";
import { Message } from "./Message";
import { MainContentStyles } from "../styles/MainContentStyles";
import { NewMessage } from "./NewMessage";
import { MessagesList } from "./MessagesList";

interface IProps {
  conversation_id: number;
}

export const GET_MESSAGES_QUERY = gql`
  query GET_MESSAGES_QUERY($where: MessageWhereInput!) {
    messages(where: $where) {
      id
      content
      sent_at
      from {
        first_name
        id
      }
    }
  }
`;

class Messages extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <Query
        pollInterval={1000 * 30}
        query={GET_MESSAGES_QUERY}
        variables={{
          where: {
            conversation: { id: +this.props.conversation_id }
          }
        }}
      >
        {({ data, loading, error }: QueryResult<{ messages: [IMessage] }>) => {
          if (loading) {
            return <p>Loading</p>;
          }
          if (error) return <p>Error</p>;
          if (!data) return <p>Error</p>;

          return (
            <React.Fragment>
              <div className="main-content-header">
                {!data.messages.length && !loading && "No messages yet"}
                {loading && "Loading messages..."}
                {!!data.messages.length && "Messages"}
              </div>
              <MessagesList
                messages={data.messages}
                conversation_id={this.props.conversation_id}
              />
              <style jsx>{MainContentStyles}</style>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export { Messages };
