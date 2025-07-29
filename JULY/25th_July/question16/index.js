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

//  Get Firestore instance
const db = getFirestore(app);

//  Add  function
async function addNewEntry() {

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    try {
        if (email !== "" || password !== "") {
            const docRef = await addDoc(collection(db, "myCollection"), {
                password: password,
                email: email
            });
            console.log("Document with ID:", docRef.id);
            fetchData()
        }

    } catch (error) {
        console.error("Error adding document:", error);
    }
}


document.getElementById("addEntry").addEventListener("click", addNewEntry)

// get function
async function fetchData() {
    const list = document.getElementById('output-list');
    list.innerHTML = "";
    try {
        const querySnapshot = await getDocs(collection(db, "myCollection"));
        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;

            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Email:</strong> ${data.email},
                <strong>Password:</strong> ${data.password}
                <button class="edit-btn" data-id="${id}">Edit</button>
                <button class="delete-btn" data-id="${id}">Delete</button>
            `;
            list.appendChild(li);

            // Attach delete listener
            li.querySelector(".delete-btn").addEventListener("click", async () => {
                await deleteDoc(doc(db, "myCollection", id));
                fetchData();
            });

            
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// Initial load
fetchData();





fetchData()

