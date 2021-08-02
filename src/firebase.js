import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCCLnyaSIqouJst8KMYl3ngZjSUG5D0-ho",
    authDomain: "whatsapp-clone-cdef6.firebaseapp.com",
    projectId: "whatsapp-clone-cdef6",
    storageBucket: "whatsapp-clone-cdef6.appspot.com",
    messagingSenderId: "224270512731",
    appId: "1:224270512731:web:8e23e3a9827f59e9acc57e",
    measurementId: "G-TF5LW3XPXD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
