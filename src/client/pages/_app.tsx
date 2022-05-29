import App from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { SnackbarProvider } from 'notistack';
import { CookiesProvider } from 'react-cookie';

import * as VARIABLES from '../src/constants/variables';
import Theme from '../theme';
import wrapper, { rrfProps } from '../src/redux/store';
import { AuthListener } from '../src/utils';

const GlobalStyles = createGlobalStyle`
  html, body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    margin: 0px;
    overflow-x: hidden;
  }
  @primary-color: red !important; // primary color for all components
  #__react-alert__ {
    position: relative;
    z-index: 9999 !important;
    &> div:first-child {
      margin-bottom: 25px;
    }
  }
`;

class Init extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    return (
      <CookiesProvider>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Theme>
            <GlobalStyles />
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" />
            </Head>
            <AuthListener>
              <SnackbarProvider autoHideDuration={VARIABLES.ALERT_DEFAULT_DURATION}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </AuthListener>
          </Theme>
        </ReactReduxFirebaseProvider>
      </CookiesProvider>
    );
  }
}

export default wrapper.withRedux(Init);
