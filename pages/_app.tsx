import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import { WithApolloProps } from "next-with-apollo";
import { GlobalStyles } from "../components/GlobalStyles";

class MyApp extends App<WithApolloProps<{}>> {
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
        <GlobalStyles />
      </Container>
    );
  }
}

const WithApolloApp = withData(MyApp);

export default WithApolloApp;
