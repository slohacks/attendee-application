import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBZcbyksEiROWXdBuRTzASzIDrUbttTwJk',
  authDomain: 'attendee-application.firebaseapp.com',
  databaseURL: 'https://attendee-application.firebaseio.com',
  projectId: 'attendee-application',
  storageBucket: 'attendee-application.appspot.com',
  messagingSenderId: '667136836888',
};

firebase.initializeApp(config);

const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

const applicationsRef = firestore.collection('applications');
const rsvpRef = firestore.collection('rsvp');

export {
  firebase,
  firestore,
  applicationsRef,
  rsvpRef,
};
