import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      first_name
      last_name
      email
      role
    }
  }
`;

export const User = (props: {
  children: (
    payload: QueryResult<{ me: IStandardUser }>,
    ...args: any[]
  ) => any;
}) => (
  <Query query={CURRENT_USER_QUERY} {...props}>
    {(payload: QueryResult<{ me: IStandardUser }>) => {
      return props.children(payload);
    }}
  </Query>
);
