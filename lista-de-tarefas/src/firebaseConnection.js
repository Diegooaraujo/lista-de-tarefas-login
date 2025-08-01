import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

//initalize para inicializar o firebase
//getFirestore para pegar o banco de dados
//getAuth para pegar a autenticação



const firebaseConfig = {
  apiKey: "AIzaSyB6-ujdJibXJnVO2y51EedKvuTu5Tn9vlU",
  authDomain: "curso-32cf8.firebaseapp.com",
  projectId: "curso-32cf8",
  storageBucket: "curso-32cf8.firebasestorage.app",
  messagingSenderId: "539666313465",
  appId: "1:539666313465:web:109ce8e406d5589307b228",
  measurementId: "G-YZVL3ZP4CV"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp); //inicializando o banco de dados
const auth = getAuth(firebaseApp); //inicializando a autenticação

export { db, auth};