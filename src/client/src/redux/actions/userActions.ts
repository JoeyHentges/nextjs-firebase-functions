import Cookies from 'universal-cookie';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { firestore, auth } from '../../lib/firebase';
import * as VARIABLES from '../../constants/variables';
import {
  signInResolved,
  signInRejected,
  signUpResolved,
  signUpRejected,
  signOutResolved,
  signOutRejected,
  forgotPasswordResolved,
  forgotPasswordRejected,
} from '../reducers/userSlice';

export const updateSession = () => async (dispatch, getState) => {
  const { uid } = getState().user.user;
  const cookies = new Cookies();
  cookies.remove('auth/session');
  cookies.set('auth/session', uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
};

export const signIn = (credentials) => async (dispatch, getState) => {
  const { email, password } = credentials;
  const cookies = new Cookies();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (user) => {
      const profileDoc = await getDoc(doc(firestore, 'users', user.user.uid));
      if (!profileDoc.exists()) {
        return dispatch(
          signInRejected({
            error: 'User does not exist',
          })
        );
      }
      const profile = profileDoc.data();
      cookies.set('auth/session', user.user.uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
      dispatch(
        signInResolved({
          email: user.user.email,
          uid: user.user.uid,
          dateCreated: profile.dateCreated,
          firstName: profile.firstName,
          lastName: profile.lastName,
        })
      );
    })
    .catch((error) =>
      dispatch(
        signInRejected({
          error,
        })
      )
    );
};

export const signUp = (newUser) => async (dispatch, getState) => {
  const { email, password, firstName, lastName } = newUser;
  const cookies = new Cookies();

  const userDetails = {
    dateCreated: Timestamp.fromDate(new Date(Date.now())),
    firstName,
    lastName,
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (user) => {
      try {
        await setDoc(doc(firestore, 'users', user.user.uid), userDetails);
      } catch (error) {
        return dispatch(signUpRejected({ error }));
      }
      cookies.set('auth/session', user.user.uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
      dispatch(
        signUpResolved({
          email: user.user.email,
          uid: user.user.uid,
          dateCreated: userDetails.dateCreated,
          firstName,
          lastName,
        })
      );
    })
    .catch((error) => dispatch(signUpRejected({ error })));
};

export const signOut = () => async (dispatch, getState) => {
  const cookies = new Cookies();

  firebaseSignOut(auth)
    .then(() => {
      cookies.remove('auth/session');
      dispatch(signOutResolved());
    })
    .catch((error) => signOutRejected({ error }));
};

export const forgotPassword = (email) => async (dispatch, getState) =>
  sendPasswordResetEmail(auth, email)
    .then(() => dispatch(forgotPasswordResolved()))
    .catch((error) => dispatch(forgotPasswordRejected({ error })));
