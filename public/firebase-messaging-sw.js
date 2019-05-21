// import firebase scripts inside service worker js script
importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '849280843071'
});

const messaging = firebase.messaging();
