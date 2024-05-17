
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDaSDwBOntAd-LWD6Rpils_3n3ux9dN1Ak",
  authDomain: "netflix-clone-6fa99.firebaseapp.com",
  projectId: "netflix-clone-6fa99",
  storageBucket: "netflix-clone-6fa99.appspot.com",
  messagingSenderId: "611257926127",
  appId: "1:611257926127:web:59f1e0088a187e9973b61a",
  measurementId: "G-4WC5VF9SN4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(error){
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const login = async (email, password)=>{
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}


const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signUp, logout}