import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { CardStyles } from "../styles/CardStyles";
import Link from "next/link";

interface IProps {
  section_id: string;
  role: "student" | "instructor";
  user_id?: string;
}

/**
 * user_conversations really only needs conversation { id } but
 * there's an Apollo bug that resets user_conversations when
 * the USER_OVERVIEW_QUERY runs. Might be able to fix this
 * better with Fragments?
 *
 * */

const SECTION_USERS_QUERY = gql`
  query SECTION_USERS_QUERY($section_id: String!, $role: String!) {
    sectionUsers(section_id: $section_id, role: $role) {
      id
      first_name
      last_name
      user_conversations {
        conversation {
          id
          user_conversations {
            user {
              first_name
            }
          }
        }
      }
      messages {
        id
      }
    }
  }
`;

export const SectionUsers = ({ section_id, role, user_id }: IProps) => (
  <Query query={SECTION_USERS_QUERY} variables={{ section_id, role }}>
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;
      if (!data) return <p>Error</p>;

      return (
        <React.Fragment>
          <h2 style={{ textTransform: "capitalize" }}>
            {role}s ({data.sectionUsers.length})
          </h2>
          {data.sectionUsers.map((user: any) => (
            <Link
              key={user.id}
              href={{
                path: "/sections",
                query: { section_id, user_id: user.id }
              }}
            >
              <div
                className={`card ${
                  user_id === user.id.toString() ? "selected" : ""
                }`}
              >
                <div className="card-header">
                  {user.first_name} {user.last_name}
                </div>
                <div className="card-content">
                  <p>{user.user_conversations.length} Conversations</p>
                  <p>{user.messages.length} Messages sent</p>
                </div>
              </div>
            </Link>
          ))}
          <style jsx>{CardStyles}</style>
        </React.Fragment>
      );
    }}
  </Query>
);
