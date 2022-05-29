import firebase from 'firebase';

export interface Profile {
  dateCreated: firebase.firestore.Timestamp;
  firstName: string;
  lastName: string;
}
