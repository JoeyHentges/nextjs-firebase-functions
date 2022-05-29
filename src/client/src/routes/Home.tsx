import React, { useMemo } from 'react';
import { Typography, Button, Grid, FormControlLabel, Switch, Box } from '@mui/material';
import styled from 'styled-components';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { connect, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { CustomSnackMessage } from '../components';
import { signOut } from '../redux';

const Container = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <Button
        onClick={() =>
          enqueueSnackbar('Report Complete', {
            variant: 'warning',
            autoHideDuration: 5000,
          })
        }
      >
        Show custom snack
      </Button>
    </React.Fragment>
  );
}

const Home = ({ auth, profile }) => {
  const { email } = auth;
  const { firstName, lastName } = profile;

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookie, removeCookie] = useCookies(['darkMode']);
  const darkModeEnabled = useMemo(() => (cookies.darkMode === 'true' ? true : false), [cookies]);

  const handleDarkModeCookie = (enable: boolean) => {
    if (enable) {
      setCookie('darkMode', true);
    } else {
      removeCookie('darkMode');
    }
  };

  return (
    <Container>
      <Grid container direction="column" alignItems="center" justifyContent="center" rowSpacing={3}>
        <Grid item xs>
          <img src="/images/nextjs-thumbnail.png" alt="logo" loading="lazy" width={300} />
        </Grid>
        <Grid item xs>
          <Typography variant="h3">React NextJS Boilerplate</Typography>
          <Typography variant="subtitle1">Firebase, Material UI V5, Styled Components</Typography>
        </Grid>
        <Grid item xs>
          <FormControlLabel
            control={<Switch checked={darkModeEnabled} onChange={(e, enabled) => handleDarkModeCookie(enabled)} />}
            label="Dark Mode"
          />
          <Button
            onClick={() =>
              enqueueSnackbar('done', {
                variant: 'success',
                autoHideDuration: 5000,
              })
            }
          >
            Show Snack
          </Button>

          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            content={(key, message) => <CustomSnackMessage id={key} message={message} />}
          >
            <MyApp />
          </SnackbarProvider>
        </Grid>
        <Grid item>
          {auth && (
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Grid item xs>
                <Typography variant="body1">
                  Signed in as {firstName} {lastName} with {email}.
                </Typography>
              </Grid>
              <Grid item xs>
                <Button onClick={() => dispatch(signOut())}>Sign out</Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default connect(mapStateToProps, null)(Home);
