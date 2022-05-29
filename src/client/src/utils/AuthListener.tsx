import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import Cookies from 'universal-cookie';
import { useIdleTimer } from 'react-idle-timer';
import styled from 'styled-components';
import { Modal, Button } from '@mui/material';

import * as VARIABLES from '../constants/variables';
import { RootReducer, signOut, updateSession } from '../redux';
import { useScrollBlock } from '../hooks';

const ModalContainer = styled.div`
  text-align: center;
  padding: 10px;
`;

const ModalTitle = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-size: 25px;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  padding: 20px 0 20px 0;
`;

const ModalDescription = styled.div`
  color: ${({ theme }) => theme.palette.grey[500]};
  filter: brightness(130%);
  font-size: 20px;
`;

const AuthListener = (props) => {
  const { children } = props;

  const dispatch = useDispatch();
  const [blockScroll, allowScroll] = useScrollBlock();
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [sessionCountdownTimer, setSessionCountdownTimer] = useState(0);

  const cookies = new Cookies();
  const authSessionCookie = cookies.get('auth/session');

  const handleOnAction = () => {
    if (!showTimeoutModal) {
      setShowTimeoutModal(false);
      allowScroll();
      if (authSessionCookie) dispatch(updateSession());
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

  // handle page loading - load only if auth and profile have successfully loaded fully
  const auth = useSelector((state: RootReducer) => state.firebase.auth);
  const profile = useSelector((state: RootReducer) => state.firebase.profile);

  /*
    Handle Firebase Sessions
    no cookie (expired) = sign out
    cookie = update their session
  */
  if (auth.uid) {
    if (!authSessionCookie) dispatch(signOut());
    else dispatch(updateSession());
  }

  if (!isLoaded(auth) || !isLoaded(profile)) return <>Loading...</>;

  const convertSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
    return `${minutes}:${seconds}`;
  };

  return (
    <>
      {authSessionCookie && showTimeoutModal && auth && (
        <Modal
          //closable={false}
          open={showTimeoutModal}
        >
          <ModalContainer>
            <ModalTitle>Your session is about to expire! {convertSecondsToTime(sessionCountdownTimer)}</ModalTitle>
            <ModalDescription>
              Please refresh your session to remain logged in. Don't worry, we kept everything in place.
            </ModalDescription>
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
