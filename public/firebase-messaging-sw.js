importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Usando as variáveis de ambiente do Vite
const firebaseConfig = {
  apiKey: "AIzaSyC8drfAGMjO_NZyp81ZmVpCaKIPZZnYkE",
  authDomain: "notificationpwa-96fa8.firebaseapp.com",
  projectId: "notificationpwa-96fa8",
  storageBucket: "notificationpwa-96fa8.firebasestorage.app",
  messagingSenderId: "252969259945",
  appId: "G-05Q9HRR5ZC",
  measurementId: "BC8fe8Ei3tv7ITyhf9bW3CvZFyK3Udbh5_1OHIKwyfBETiu2fz8geBmpSlLPGtXVhnp9YJMaJakPovk6Qi-1baI"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
});