
importScripts("https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyCyB8SfNP5uvqNLWw3voeB8nNtSJvWeplQ",
    authDomain: "tutorial-test-fb-5d8ba.firebaseapp.com",
    projectId: "tutorial-test-fb-5d8ba",
    storageBucket: "tutorial-test-fb-5d8ba.appspot.com",
    messagingSenderId: "987311190427",
    appId: "1:987311190427:web:1923c38024b20364afb13e"
});

const messaging = firebase.messaging();

// Background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "New Message", {
    body: body || "",
    icon: icon || "/favicon.ico",
    data: payload.data || {},
  });
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.click_action || "/";
  event.waitUntil(clients.openWindow(url));
});
