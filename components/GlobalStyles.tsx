import Head from "next/head";
export const GlobalStyles = () => (
  <>
    <Head>
      <link
        href="https://use.fontawesome.com/releases/v5.4.1/css/svg-with-js.css"
        rel="stylesheet"
      />
    </Head>
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css?family=Varela+Round");
      html {
        box-sizing: border-box;
        font-size: 10px;
      }
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
      body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
        background-color: #f7f7f7;
      }

      * {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
      a:hover {
        text-decoration: underline;
      }

      h1,
      h2,
      h3,
      h4,
      h5 {
        font-family: "Varela Round";
        padding: 0;
        margin: 10px;
      }

      fieldset {
        margin: 0;
        padding: 0;
        border: none;
      }
    `}</style>
  </>
);
