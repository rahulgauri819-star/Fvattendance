importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC5e4fS-kUUTym3eRYQmOAmZ6V5JDiGGUU",
  authDomain: "fotovision-attendance.firebaseapp.com",
  projectId: "fotovision-attendance",
  storageBucket: "fotovision-attendance.firebasestorage.app",
  messagingSenderId: "840529583846",
  appId: "1:840529583846:web:2330162371103b8f912527"
});

const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data
  });
});
