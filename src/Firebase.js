import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB4wQaoT3UqMoiiOj1spk54pNQLIrjukss",
  authDomain: "signin-task-475a0.firebaseapp.com",
  projectId: "signin-task-475a0",
  storageBucket: "signin-task-475a0.appspot.com",
  messagingSenderId: "750825253948",
  appId: "1:750825253948:web:f69ee91c90303afbb72739",
  measurementId: "G-40XHXYB9BZ",
  // databaseURL:'https://signin-task-475a0-default-rtdb.firebaseio.com/',

};

const app = initializeApp(firebaseConfig);

export default app;