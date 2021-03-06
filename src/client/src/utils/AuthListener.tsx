import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { useIdleTimer } from 'react-idle-timer';
import styled from 'styled-components';
import { Modal, Button, Paper, Typography } from '@mui/material';

import * as VARIABLES from '../constants/variables';
import { RootReducer, signOut, updateSession } from '../redux';
import { useScrollBlock } from '../hooks';

const ModalContainer = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  text-align: center;
  padding: 20px;
`;

const AuthListener = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const [blockScroll, allowScroll] = useScrollBlock();
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [sessionCountdownTimer, setSessionCountdownTimer] = useState(0);

  const cookies = new Cookies();
  const authSessionCookie = cookies.get('user/session');

  const user = useSelector((state: RootReducer) => state.user.user);

  const handleOnAction = () => {
    if (!showTimeoutModal) {
      setShowTimeoutModal(false);
      allowScroll();
      if (authSessionCookie && user) dispatch(updateSession());
    }
  };

  const handleSessionWarning = () => {
    if (!showTimeoutModal) {
      setSessionCountdownTimer(60 * 5);
      setShowTimeoutModal(true);
      blockScroll();
    }
  };

  const handleSessionExpiration = () => {
    setShowTimeoutModal(false);
    allowScroll();
    if (authSessionCookie) dispatch(signOut());
  };

  useIdleTimer({
    timeout: 1000 * 60 * (VARIABLES.SESSION_DURATION - 5),
    onIdle: handleSessionWarning,
    onAction: handleOnAction,
    debounce: 500,
  });

  useIdleTimer({
    timeout: 1000 * 60 * VARIABLES.SESSION_DURATION,
    onIdle: handleSessionExpiration,
    onAction: handleOnAction,
    debounce: 500,
  });

  useEffect(() => {
    authSessionCookie &&
      showTimeoutModal &&
      sessionCountdownTimer > 0 &&
      setTimeout(() => setSessionCountdownTimer(sessionCountdownTimer - 1), 1000);
    if (authSessionCookie && showTimeoutModal && sessionCountdownTimer === 0) {
      setShowTimeoutModal(false);
      allowScroll();
      dispatch(signOut());
    }
  }, [sessionCountdownTimer, showTimeoutModal]);

  /*
    Handle Firebase Sessions
    no cookie (expired) = sign out
    cookie = update their session
  */
  if (user) {
    if (!authSessionCookie) dispatch(signOut());
    else dispatch(updateSession());
  }

  const convertSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {authSessionCookie && showTimeoutModal && user && (
        <Modal
          //closable={false}
          open={showTimeoutModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalContainer>
            <Typography variant="h5">
              Your session is about to expire! {convertSecondsToTime(sessionCountdownTimer)}
            </Typography>
            <Typography variant="body1">
              Please refresh your session to remain logged in. Don't worry, we kept everything in place.
            </Typography>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowTimeoutModal(false);
                  allowScroll();
                }}
              >
                Refresh
              </Button>
              ,
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setShowTimeoutModal(false);
                  allowScroll();
                  dispatch(signOut());
                }}
              >
                Sign Out
              </Button>
            </div>
          </ModalContainer>
        </Modal>
      )}
      {children}
    </>
  );
};

export default AuthListener;
