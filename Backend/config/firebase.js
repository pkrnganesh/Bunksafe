const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc, setDoc } = require("firebase/firestore");
const dotenv = require("dotenv");

dotenv.config();
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Create or update a document named "users" in Firestore
async function setUserCount(count) {
  try {
    await setDoc(doc(db, "users", "usercount"), { count: count });
    console.log("Document written successfully!");
  } catch (e) {
    console.error("Error writing document: ", e);
  }
}

// Function to increment the count
async function incrementUserCount() {
  const docRef = doc(db, "users", "usercount");
  const docSnap = await getDoc(docRef);

  let currentCount = 0;
  if (docSnap.exists()) {
    currentCount = docSnap.data().count;
  }

  const newCount = currentCount + 1;

  try {
    await setDoc(docRef, { count: newCount });
    console.log("Document updated successfully!");
    return newCount;
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
}

// Export the incrementUserCount function for use in other parts of your application
module.exports = { incrementUserCount, setUserCount };
