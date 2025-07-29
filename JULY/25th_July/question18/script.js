import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import { getFirestore, deleteDoc, getDocs, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAlbrMTsbRY_QeyrTznL3PCQQgJlnwqXi0",
    authDomain: "crud-app-eadb2.firebaseapp.com",
    projectId: "crud-app-eadb2",
    storageBucket: "crud-app-eadb2.firebasestorage.app",
    messagingSenderId: "761292207931",
    appId: "1:761292207931:web:e94728271ea0a16043a91e",
    measurementId: "G-BN73XCS354"
};

//  Initialize Firebase App and Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//  Get Firestore   instance
const db = getFirestore(app);



async function addNewEntry() {

    let name = document.getElementById("name").value
    let age = document.getElementById("age").value
    let grade = document.getElementById("grade").value
    let enrolled = document.getElementById("enrolled").checked

    try {
        if (name !== "" || age !== "" || grade !== "") {
            const docRef = await addDoc(collection(db, "students"), {
                name: name,
                age: age,
                grade: grade,
                enrolled: enrolled
            });
            console.log("Document with ID:", docRef.id);
            fetchData()
        }

    } catch (error) {
        console.error("Error adding document:", error);
    }
}

addNewEntry()