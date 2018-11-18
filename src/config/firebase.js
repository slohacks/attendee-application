import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {apiKey: "AIzaSyA0Ktp6yx0Sey_G4OlOTW_mnIfU0EjBXOI",
authDomain: "attendee-application.firebaseapp.com",
databaseURL: "https://attendee-application.firebaseio.com",
projectId: "attendee-application",
storageBucket: "attendee-application.appspot.com",
messagingSenderId: "667136836888"};

firebase.initializeApp(config);

const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

const applicationsRef = firestore.collection('applications');

export { firebase, firestore, applicationsRef };
