import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {};

firebase.initializeApp(config);

const firestore = firebase.firestore();

const settings = {
  timestampsInSnapshots: true,
};

firestore.settings(settings);

const applicationsRef = firestore.collection('applications');

export { firebase, firestore, applicationsRef };
