import Cookies from 'universal-cookie';

import * as VARIABLES from '../../constants/variables';

export const updateSession =
  () =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const { uid } = getState().firebase.auth;
    const cookies = new Cookies();
    cookies.remove('auth/session');
    cookies.set('auth/session', uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
  };

export const signIn =
  (credentials) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { email, password } = credentials;
    const cookies = new Cookies();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        cookies.set('auth/session', user.user.uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
        dispatch({ type: 'auth/signInResolved' });
      })
      .catch((error) => dispatch({ type: 'auth/signInRejected', error }));
  };

export const signUp =
  (newUser) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const { email, password, firstName, lastName } = newUser;
    const firebase = getFirebase();
    const firestore = getFirestore();
    const cookies = new Cookies();

    const userDetails = {
      dateCreated: Date.now(),
      firstName,
      lastName,
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const { user } = response;
        return firestore.collection('users').doc(user.uid).set(userDetails);
      })
      .then((response) => {
        const { user } = response;
        cookies.set('auth/session', user.uid, { path: '/', maxAge: VARIABLES.SESSION_DURATION * 60 });
        dispatch({ type: 'auth/signUpResolved' });
      })
      .catch((error) => dispatch({ type: 'auth/signUpRejected', error }));
  };

export const signOut =
  () =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const cookies = new Cookies();
    firebase
      .auth()
      .signOut()
      .then(() => {
        cookies.remove('auth/session');
        dispatch({ type: 'auth/signOutResolved' });
      })
      .catch((error) => dispatch({ type: 'auth/signOutRejected', error }));
  };

export const forgotPassword =
  (email) =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => dispatch({ type: 'auth/forgotPasswordResolved' }))
      .catch((error) => dispatch({ type: 'auth/forgotPasswordRejected', error }));
  };
