import withApollo from "next-with-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
// import * as WebSocket from 'ws'

// import ApolloClient from "apollo-boost";

function createClient({ headers }: { headers: {} }) {
  const wsLink = process.browser
    ? new WebSocketLink({
        uri: "ws://localhost:3001",
        options: {
          reconnect: true
        }
      })
    : undefined;

  const httpLink = new HttpLink({
    uri: "http://localhost:3001",
    credentials: "include",
    headers
  });

  const link = process.browser
    ? split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query);
          return kind !== "OperationDefintion" && operation !== "subscription";
        },
        httpLink,
        wsLink
      )
    : httpLink;

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) => {
            console.log(
              `[GraphQL error]: Message: ${message}, Location ${locations}, Path: ${path}`,
              message
            );
          });
        }
      }),
      link
    ]),
    cache: new InMemoryCache()
  });
}

export default withApollo(createClient);
