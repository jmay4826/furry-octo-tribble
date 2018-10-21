import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";

function createClient({ headers }: { headers: {} }) {
  return new ApolloClient({
    uri: "http://localhost:3001",
    request: async operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
