import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAQbjytNrhV01CxZkFcHyrtQzWx96jaMpQ",
    authDomain: "react-spas-n.firebaseapp.com",
    databaseURL: "https://react-spas-n.firebaseio.com",
    projectId: "react-spas-n",
    storageBucket: "react-spas-n.appspot.com",
    messagingSenderId: "451342288255",
    appId: "1:451342288255:web:37142cb9871ebf90ba064a",
    measurementId: "G-W5EC1B3QJM"
};
firebase.initializeApp(firebaseConfig);

//export const provider = new firebase.auto.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;