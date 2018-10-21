import firebase from 'firebase';

// config goes here

firebase.initializeApp(config);

const database = firebase.database();

export default database;