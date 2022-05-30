import { Timestamp } from 'firebase/firestore';

export type UserDetails = {
  email: string;
  uid: string;
  dateCreated: Timestamp;
  firstName: string;
  lastName: string;
};
