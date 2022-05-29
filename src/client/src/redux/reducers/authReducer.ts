import { Action } from '../types';

export interface AuthReducer {
  error: string;
}

const initialState: AuthReducer = {
  error: null,
};

export interface AuthAction extends Action {}

export const authReducer = (state = initialState, action: AuthAction) => {
  const newState = { ...state };

  switch (action.type) {
    case 'auth/signInResolved':
      newState.error = null;
      break;

    case 'auth/signInRejected':
      newState.error = action.error.message;
      break;

    case 'auth/signUpResolved':
      newState.error = null;
      break;

    case 'auth/signUpRejected':
      newState.error = action.error.message;
      break;

    case 'auth/signOutResolved':
      newState.error = null;
      break;

    case 'auth/signOutRejected':
      newState.error = action.error.message;
      break;

    case 'auth/ForgotPasswordResolved':
      newState.error = 'Please check your email to reset your password.';
      break;

    case 'auth/ForgotPasswordRejected':
      newState.error = action.error.message;
      break;

    default:
      return newState;
  }
  return newState;
};
