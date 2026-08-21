/* =========================================================
   FIREBASE CONFIG
   This object is safe to ship in client-side code — it is not a
   secret. Real protection comes from Firestore/Auth security rules
   (see firestore.rules), not from hiding these values.
========================================================= */
const firebaseConfig = {
  apiKey: "AIzaSyD64Vlh1sytQoMavW4Rph3AA-_rZN1AUeE",
  authDomain: "bowklin-259fc.firebaseapp.com",
  projectId: "bowklin-259fc",
  storageBucket: "bowklin-259fc.firebasestorage.app",
  messagingSenderId: "1027681057866",
  appId: "1:1027681057866:web:52a1a728e05fbdc30cbab3",
  measurementId: "G-689Z61S3T3"
};

firebase.initializeApp(firebaseConfig);

/* Shared handles used by auth.js / admin.js */
const auth = firebase.auth();
const db = firebase.firestore();

/* Keep the admin signed in across page loads/tabs/browser restarts
   until they explicitly log out. This is Firebase's default on the
   web, but setting it explicitly protects against browsers/modes
   (e.g. some private-browsing setups) where the default silently
   falls back to a weaker, per-tab persistence — which is what makes
   it feel like you have to log in again every time. */
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((err) => {
  console.error("setPersistence failed", err);
});
