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

// Handle FCM background messages
messaging.onBackgroundMessage((payload) => {
  console.log('FCM background message received:', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data
  });
});

// Handle native Web Push messages (sent via webpush.sendNotification)
self.addEventListener('push', (event) => {
  console.log('Native push event received:', event);
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch(e) { payload = { title: 'Fotovision', body: event.data ? event.data.text() : '' }; }
  const title = payload.title || 'Fotovision';
  const options = {
    body: payload.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Optional: handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
