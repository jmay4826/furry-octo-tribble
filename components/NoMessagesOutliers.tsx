import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Card } from "./Card";
import Link from "next/link";
import { CardStyles } from "../styles/CardStyles";

const NO_MESSAGES_QUERY = gql`
  query NO_MESSAGES_QUERY($section_id: ID!) {
    appusers(
      where: {
        messages_none: { id_not: null }
        user_sections_some: { section: { id: $section_id } }
      }
    ) {
      id
      first_name
      last_name
    }
  }
`;

export const NoMessagesOutliers = ({ section_id }: { section_id: string }) => (
  <Query query={NO_MESSAGES_QUERY} variables={{ section_id }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;
      if (!data) return <p>Error</p>;
      console.log(data);
      return (
        <Card
          defaultExpanded={true}
          expandable={true}
          header={`Students without Messages (${data.appusers.length})`}
        >
          <div
            className="card-content"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {data.appusers.map(user => (
              <div key={user.id} style={{ margin: "10px" }}>
                <Link
                  href={{
                    path: "/sections",
                    query: {
                      section_id,
                      user_id: user.id
                    }
                  }}
                >
                  <a>
                    {user.first_name} {user.last_name}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <style jsx>{CardStyles}</style>
        </Card>
      );
    }}
  </Query>
);
