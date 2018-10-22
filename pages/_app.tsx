import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import { WithApolloProps } from "next-with-apollo";
import Router from "next/router";
import { GlobalStyles } from "../components/GlobalStyles";
import * as NProgress from "nprogress";
import Head from "next/head";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App<WithApolloProps<{}>> {
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
          <title>Penpals</title>
        </Head>
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
