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

// Function to increment the count and save IP address
async function incrementUserCount(ipAddress) {
  const docRef = doc(db, "users", "usercount");
  const docSnap = await getDoc(docRef);

  let currentCount = 0;
  let ipAddresses = [];
  if (docSnap.exists()) {
    currentCount = docSnap.data().count || 0;
    ipAddresses = docSnap.data().ipAddresses || [];
  }

  const newCount = currentCount + 1;
  ipAddresses.push(ipAddress); // Append the new IP address to the array

  try {
    await setDoc(docRef, {
      count: newCount,
      ipAddresses: ipAddresses
    });
    console.log("Document updated successfully!");
    return newCount;
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
}


async function storeAnonymousData(id, dataValue) {
  // Ensure the dataValue is within the limit
  if (dataValue.length > 30000) {
    throw new Error("Data value exceeds the 30,000 characters limit.");
  }

  const docRef = doc(db, "anonymous_store", id); 

  try {
    await setDoc(docRef, {
      id: id,
      dataValue: dataValue
    });
    console.log("Data stored successfully!");
    return { id, dataValue };
  } catch (e) {
    console.error("Error storing data: ", e);
    throw e;
  }
}

async function fetchAnonymousData(id) {
  const docRef = doc(db, "anonymous_store", id);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      throw new Error("Document not found");
    }
  } catch (e) {
    console.error("Error fetching document: ", e);
    throw e;
  }
}

module.exports = { incrementUserCount, storeAnonymousData, fetchAnonymousData };
