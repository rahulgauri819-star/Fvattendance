// Native Web Push service worker - no Firebase SDK needed

self.addEventListener('push', (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } 
  catch(e) { payload = { title: 'Fotovision', body: event.data ? event.data.text() : '' }; }
  const title = payload.title || 'Fotovision';
  const options = {
    body: payload.body || '',
    icon: '/Fvattendance/icon-192.png',
    badge: '/Fvattendance/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/Fvattendance/'));
});
