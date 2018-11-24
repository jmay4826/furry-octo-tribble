import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { MainContentStyles } from "../styles/MainContentStyles";
import { Card } from "./Card";
import { CardStyles } from "../styles/CardStyles";
import Link from "next/link";
import { ConversationPreview } from "./ConversationPreview";

/**
 * TODO: There's nothing stopping this from
 */

const USER_OVERVIEW_QUERY = gql`
  query USER_OVERVIEW_QUERY($user_id: Int!) {
    appuser(where: { id: $user_id }) {
      id
      first_name
      last_name
      user_conversations {
        conversation {
          id
          messages(last: 1) {
            content
          }
          user_conversations(where: { user: { role_not: "instructor" } }) {
            user {
              first_name
            }
          }
        }
      }
    }
  }
`;

export const UserOverview = ({ user_id }: { user_id: string }) => (
  <Query query={USER_OVERVIEW_QUERY} variables={{ user_id: +user_id }}>
    {({ data, loading, error }) => {
      if (!data.appuser) return <p>No user found</p>;
      return (
        <React.Fragment>
          <div className="main-content-header">
            {data.appuser.first_name} {data.appuser.last_name}
            <div className="card-content" style={{ display: "inline-block" }}>
              {data.appuser.user_conversations.length} conversations
            </div>
          </div>
          <div className="main-content">
            <Card header="Add a new conversation" headerSize="large">
              blah
            </Card>
            {data.appuser.user_conversations.map(uc => (
              <ConversationPreview {...uc.conversation} />
            ))}
          </div>
          <style jsx>{CardStyles}</style>
          <style jsx>{MainContentStyles}</style>
        </React.Fragment>
      );
    }}
  </Query>
);
